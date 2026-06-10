import { useTheme, Dialog, DialogContent, IconButton, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { filterWindowStyles } from '../styles/FilterWindowStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface FilterWindowProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

export interface FilterValues {
  country: string;
  industry: string;
  injustice: string;
  orderBy: string;
}

export default function FilterWindow({ open, onClose, onApply }: FilterWindowProps) {
  const theme = useTheme();
  
  const [filters, setFilters] = useState<FilterValues>({
    country: '',
    industry: '',
    injustice: '',
    orderBy: ''
  });

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Brazil',
    'Mexico',
    'Japan',
    'China',
    'India',
    'Australia'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Transportation',
    'Energy',
    'Agriculture',
    'Entertainment'
  ];

  const injustices = [
    'Discrimination',
    'Harassment',
    'Unfair Treatment',
    'Wage Theft',
    'Unsafe Working Conditions',
    'Wrongful Termination',
    'Privacy Violation',
    'Corruption',
    'Human Rights Violation',
    'Environmental Injustice'
  ];

  const orderOptions = [
    'Most Recent',
    'Oldest First',
    'Most Relevant',
    'Highest Rated',
    'Lowest Rated',
    'Most Comments'
  ];

  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleCancel = () => {
    setFilters({
      country: '',
      industry: '',
      injustice: '',
      orderBy: ''
    });
    onClose();
  };

  const getSelectedCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
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
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
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
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Industry Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Industry</InputLabel>
            <Select
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
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
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Injustice Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Injustice</InputLabel>
            <Select
              value={filters.injustice}
              onChange={(e) => handleFilterChange('injustice', e.target.value)}
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
              {injustices.map((injustice) => (
                <MenuItem key={injustice} value={injustice}>
                  {injustice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Order By Filter */}
          <FormControl fullWidth sx={filterWindowStyles.formControl(theme)}>
            <InputLabel sx={filterWindowStyles.inputLabel(theme)}>Order by</InputLabel>
            <Select
              value={filters.orderBy}
              onChange={(e) => handleFilterChange('orderBy', e.target.value)}
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
              {orderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              {filters.country && (
                <Chip 
                  label={`Country: ${filters.country}`} 
                  onDelete={() => handleFilterChange('country', '')}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
              {filters.industry && (
                <Chip 
                  label={`Industry: ${filters.industry}`} 
                  onDelete={() => handleFilterChange('industry', '')}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
              {filters.injustice && (
                <Chip 
                  label={`Injustice: ${filters.injustice}`} 
                  onDelete={() => handleFilterChange('injustice', '')}
                  sx={filterWindowStyles.chip(theme)}
                />
              )}
              {filters.orderBy && (
                <Chip 
                  label={`Order: ${filters.orderBy}`} 
                  onDelete={() => handleFilterChange('orderBy', '')}
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