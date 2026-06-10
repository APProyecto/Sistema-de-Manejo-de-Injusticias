import React, { useState } from 'react';
import { Box, OutlinedInput, IconButton, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { postCommentBoxStyles } from '../styles/PostCommentStyles'; 

interface PostCommentBoxProps {
  onSubmit?: (content: string) => void;
  placeholder?: string;
}

export default function PostCommentBox({ onSubmit, placeholder = 'Add a comment...' }: PostCommentBoxProps) {
  const theme = useTheme();
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box sx={postCommentBoxStyles.container(theme)}>
      <OutlinedInput
        fullWidth
        multiline
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        sx={postCommentBoxStyles.input(theme)}
      />
      <IconButton onClick={handleSubmit} sx={postCommentBoxStyles.submitButton(theme)}>
        <ArrowForwardIcon sx={postCommentBoxStyles.submitIcon(theme)} />
      </IconButton>
    </Box>
  );
}