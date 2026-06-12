import { Button, InputAdornment, TextField, Badge, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import { searchBarStyles } from "../styles/SearchBarStyles";
import FilterWindow from "../public/FilterWindow";
import { useState } from "react";
import { useSearch } from "../../context/SearchContext";

export default function Searchbar() {
    const theme = useTheme();
    const [filterWindowOpen, setFilterWindowOpen] = useState(false);
    const { 
        searchText, 
        setSearchText, 
        performSearch, 
        hasActiveFilters 
    } = useSearch();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    return (
        <Box sx={searchBarStyles.container(theme)}>
            <FilterWindow 
                open={filterWindowOpen} 
                onClose={() => setFilterWindowOpen(false)}
            />
            <TextField
                placeholder="Search..."
                variant="outlined"
                size="medium"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={searchBarStyles.searchField(theme)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon 
                                    sx={searchBarStyles.searchIcon(theme)} 
                                    onClick={()=> performSearch()}
                                    style={{ cursor: 'pointer' }}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Badge 
                                    variant="dot" 
                                    color="primary"
                                    invisible={!hasActiveFilters}
                                >
                                    <Button 
                                        sx={searchBarStyles.filterButton(theme)}
                                        disableRipple
                                        onClick={() => setFilterWindowOpen(true)}
                                    >
                                        <TuneIcon />
                                    </Button>
                                </Badge>
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Box>
    );
}