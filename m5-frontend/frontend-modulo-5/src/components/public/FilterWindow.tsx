import { useTheme, Dialog, DialogContent, IconButton, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { filterWindowStyles } from '../styles/FilterWindowStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import type { Category, FilterCategories, FilterValues } from '../../types';
import { useSearch } from '../../context/SearchContext';
import { getFilterCategories } from '../../services/boycottService';

interface FilterWindowProps {
  open: boolean;
  onClose: () => void;
}

export default function FilterWindow({ open, onClose }: FilterWindowProps) {
  const theme = useTheme();
  const { filters: currentFilters, setFilters, performSearch } = useSearch();
  
  const [localFilters, setLocalFilters] = useState<FilterValues>(currentFilters);
  const [filterCategories, setFilterCategories] = useState<FilterCategories>();

  // Sincronizar filtros locales cuando cambian los filtros globales
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    getFilterCategories().then(setFilterCategories);
  }, []);


  const countries = filterCategories?.countries ?? [];
  const industries = filterCategories?.industries ?? [];
  const injustices = filterCategories?.injustices ?? [];
  const orderOptions = filterCategories?.orderOptions ?? [];

  const getCountryName = (id: number | null): string => {
    if (!id) return '';
    return countries.find(c => c.id === id)?.name || '';
  };

  const getIndustryName = (id: number | null): string => {
    if (!id) return '';
    return industries.find(i => i.id === id)?.name || '';
  };

  const getInjusticeName = (id: number | null): string => {
    if (!id) return '';
    return injustices.find(i => i.id === id)?.name || '';
  };

  const getOrderByName = (id: number | null): string => {
    if (!id) return '';
    return orderOptions.find(o => o.id === id)?.name || '';
  };

  const handleFilterChange = (field: keyof FilterValues, value: number | null) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    performSearch(localFilters); // ← pasa los valores frescos directamente
    onClose();
  };

  const handleCancel = () => {
    setLocalFilters(currentFilters);
    onClose();
  };

  const getSelectedCount = () => {
    return Object.values(localFilters).filter(value => value !== null && value !== '').length;
  };

  return (
    <Dialog 
      sx={filterWindowStyles.dialog(theme)} 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent sx={filterWindowStyles.dialogContent(theme)}>
        <Box sx={filterWindowStyles.header(theme)}>
          <Typography variant="h5" sx={filterWindowStyles.title(theme)}>
            Filters
          </Typography>
          <IconButton onClick={onClose} sx={filterWindowStyles.closeButton(theme)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={filterWindowStyles.filtersContainer(theme)}>
          {/* Country Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Country</InputLabel>
            <Select
              value={localFilters.countryId ?? ''}
              onChange={(e) => handleFilterChange('countryId', e.target.value ? Number(e.target.value) : null)}
              label="Country"
              sx={filterWindowStyles.select(theme)}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: filterWindowStyles.menuPaper(theme)
                  }
                }
              }}
            >
              <MenuItem value="">None</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Industry Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Industry</InputLabel>
            <Select
              value={localFilters.industryId ?? ''}
              onChange={(e) => handleFilterChange('industryId', e.target.value ? Number(e.target.value) : null)}
              label="Industry"
              sx={filterWindowStyles.select(theme)}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: filterWindowStyles.menuPaper(theme)
                  }
                }
              }}
            >
              <MenuItem value="">None</MenuItem>
              {industries.map((industry) => (
                <MenuItem key={industry.id} value={industry.id}>
                  {industry.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Injustice Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Injustice</InputLabel>
            <Select
              value={localFilters.injusticeId ?? ''}
              onChange={(e) => handleFilterChange('injusticeId', e.target.value ? Number(e.target.value) : null)}
              label="Injustice"
              sx={filterWindowStyles.select(theme)}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: filterWindowStyles.menuPaper(theme)
                  }
                }
              }}
            >
              <MenuItem value="">None</MenuItem>
              {injustices.map((injustice) => (
                <MenuItem key={injustice.id} value={injustice.id}>
                  {injustice.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Order By Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Order by</InputLabel>
            <Select
              value={localFilters.orderById ?? ''}
              onChange={(e) => handleFilterChange('orderById', e.target.value ? Number(e.target.value) : null)}
              label="Order by"
              sx={filterWindowStyles.select(theme)}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: filterWindowStyles.menuPaper(theme)
                  }
                }
              }}
            >
              <MenuItem value="">None</MenuItem>
              {orderOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Active Filters Summary */}
        {getSelectedCount() > 0 && (
          <Box sx={filterWindowStyles.activeFilters(theme)}>
            <Typography variant="body2" sx={filterWindowStyles.activeFiltersTitle(theme)}>
              {getSelectedCount()} Active Filters :
            </Typography>
            <Box sx={filterWindowStyles.chipContainer(theme)}>
              {localFilters.countryId && (
                <Chip 
                  label={`Country: ${getCountryName(localFilters.countryId)}`} 
                  onDelete={() => handleFilterChange('countryId', null)}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
              {localFilters.industryId && (
                <Chip 
                  label={`Industry: ${getIndustryName(localFilters.industryId)}`} 
                  onDelete={() => handleFilterChange('industryId', null)}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
              {localFilters.injusticeId && (
                <Chip 
                  label={`Injustice: ${getInjusticeName(localFilters.injusticeId)}`} 
                  onDelete={() => handleFilterChange('injusticeId', null)}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
              {localFilters.orderById && (
                <Chip 
                  label={`Order: ${getOrderByName(localFilters.orderById)}`} 
                  onDelete={() => handleFilterChange('orderById', null)}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
            </Box>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={filterWindowStyles.buttonContainer(theme)}>
          <Button 
            sx={filterWindowStyles.cancelButton(theme)} 
            onClick={handleCancel}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            sx={filterWindowStyles.applyButton(theme)} 
            onClick={handleApply}
            variant="contained"
          >
            Apply
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}