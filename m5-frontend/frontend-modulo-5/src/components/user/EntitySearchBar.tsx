import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, Avatar, useTheme, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { simpleEntity } from '../../types';
import { searchEntities } from '../../services/boycottService';

interface EntitySearchBarProps {
  categoryId: number | null;
  selectedEntity: simpleEntity | null;
  onEntityChange: (entity: simpleEntity | null) => void;
  placeholder?: string;
}

export default function EntitySearchBar({
  categoryId,
  selectedEntity,
  onEntityChange,
  placeholder = "",
}: EntitySearchBarProps) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<simpleEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update input value when selectedEntity changes externally
  useEffect(() => {
    if (selectedEntity) {
      setInputValue(selectedEntity.name);
    } else {
      setInputValue('');
    }
  }, [selectedEntity]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset when category changes
  useEffect(() => {
    setInputValue('');
    setOptions([]);
    setOpen(false);
    onEntityChange(null);
  }, [categoryId, onEntityChange]);

  // Fetch results
  useEffect(() => {
    if (!inputValue || !categoryId || (selectedEntity && inputValue === selectedEntity.name)) {
      setOptions([]);
      return;
    }
    setLoading(true);
    searchEntities(inputValue, categoryId)
      .then((results) => {
        setOptions(results);
        setOpen(results.length > 0);
        console.log(results);
      })
      .finally(() => setLoading(false));
  }, [inputValue, categoryId, selectedEntity]);

  const handleSelect = (entity: simpleEntity) => {
    onEntityChange(entity);
    setInputValue(entity.name);
    setOpen(false);
  };

  const handleClear = () => {
    onEntityChange(null);
    setInputValue('');
    setOpen(false);
  };

  // Determine what to show in the input field
  const showSelectedEntity = selectedEntity && !open && inputValue === selectedEntity.name;
  const displayValue = showSelectedEntity ? '' : inputValue;

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        {/* Search Icon - hidden when entity is selected and dropdown closed */}
        {!showSelectedEntity && (
          <Box sx={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <SearchIcon sx={{ color: theme.palette.grey[500] }} />
          </Box>
        )}

        {/* Selected Entity Display */}
        {showSelectedEntity && (
          <Box
            onClick={() => setOpen(true)}
            sx={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              zIndex: 1,
              pointerEvents: 'auto',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Avatar
              src={selectedEntity.picture ? selectedEntity.picture : undefined}
              alt={selectedEntity.name}
              sx={{ 
                width: 28, 
                height: 28, 
                borderRadius: '6px', 
                bgcolor: theme.palette.grey[800],
                fontSize: '0.875rem'
              }}
            >
              {selectedEntity.name.charAt(0)}
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500, 
                color: theme.palette.text.primary,
                fontSize: '0.9rem'
              }}
            >
              {selectedEntity.name}
            </Typography>
          </Box>
        )}

        <TextField
          fullWidth
          value={displayValue}
          onChange={(e) => {
            if (selectedEntity) {
              onEntityChange(null);
            }
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (selectedEntity) {
              // If there's a selected entity, clear it on focus to allow search
              onEntityChange(null);
              setInputValue('');
            }
            if (inputValue && categoryId) {
              setOpen(true);
            }
          }}
          placeholder={!categoryId ? "Select an entity type first" : placeholder}
          disabled={!categoryId}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingLeft: showSelectedEntity ? '120px' : '40px',
              backgroundColor: !categoryId
                ? theme.palette.action.disabledBackground
                : theme.palette.background.paper,
              borderRadius: '10px',
              '& fieldset': { 
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: categoryId ? theme.palette.primary.main : theme.palette.divider,
              },
              '&.Mui-focused fieldset': {
                borderColor: categoryId ? theme.palette.primary.main : theme.palette.divider,
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary,
              '&::placeholder': { 
                color: theme.palette.text.secondary,
                opacity: 0.7,
              },
            },
          }}
        />

        {/* Clear button when entity is selected */}
        {showSelectedEntity && (
          <Box
            onClick={handleClear}
            sx={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1,
              width: 24,
              height: 24,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&::before': {
                content: '"✕"',
                fontSize: '14px',
                color: theme.palette.text.secondary,
              },
            }}
          />
        )}

        {loading && !showSelectedEntity && (
          <Box sx={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />
          </Box>
        )}
      </Box>

      {/* Dropdown */}
      {open && options.length > 0 && (
        <Box sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1300,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          mt: 0.5,
          maxHeight: 300,
          overflowY: 'auto',
          boxShadow: theme.shadows[4],
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.grey[900],
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.grey[700],
            borderRadius: '4px',
            '&:hover': {
              background: theme.palette.grey[600],
            },
          },
        }}>
          {options.map((option) => (
            <Box
              key={option.id}
              onMouseDown={() => handleSelect(option)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': { 
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Avatar
                src={option.picture ? option.picture : undefined}
                alt={option.name}
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '8px', 
                  bgcolor: theme.palette.grey[800],
                  color: theme.palette.text.primary,
                }}
              >
                {option.name.charAt(0)}
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                {option.name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}