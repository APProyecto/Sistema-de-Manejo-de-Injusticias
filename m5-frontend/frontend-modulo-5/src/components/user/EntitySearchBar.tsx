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
  placeholder = "Search for an entity...",
}: EntitySearchBarProps) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<simpleEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [categoryId]);

  // Fetch results
  useEffect(() => {
    if (!inputValue || !categoryId) {
      setOptions([]);
      return;
    }
    setLoading(true);
    searchEntities(inputValue, categoryId)
      .then((results) => {
        setOptions(results);
        setOpen(results.length > 0);
      })
      .finally(() => setLoading(false));
  }, [inputValue, categoryId]);

  const handleSelect = (entity: simpleEntity) => {
    onEntityChange(entity);
    setInputValue(entity.name);
    setOpen(false);
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%' }}>
      <Box sx={{ position: 'relative' }}>
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

        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={!categoryId ? "Select an entity type first" : placeholder}
          disabled={!categoryId}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingLeft: '40px',
              backgroundColor: !categoryId
                ? theme.palette.action.disabledBackground
                : theme.palette.background.paper,
              borderRadius: '10px',
              '& fieldset': { borderColor: theme.palette.divider },
              '&:hover fieldset': {
                borderColor: categoryId ? theme.palette.primary.main : theme.palette.divider,
              },
              '&.Mui-focused fieldset': {
                borderColor: categoryId ? theme.palette.primary.main : theme.palette.divider,
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary,
              '&::placeholder': { color: theme.palette.text.secondary },
            },
          }}
        />

        {loading && (
          <Box sx={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <CircularProgress size={20} />
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
                py: 1,
                cursor: 'pointer',
                '&:hover': { backgroundColor: theme.palette.action.hover },
              }}
            >
              <Avatar
                src={option.picture}
                alt={option.name}
                sx={{ width: 40, height: 40, borderRadius: '8px', bgcolor: theme.palette.grey[300] }}
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