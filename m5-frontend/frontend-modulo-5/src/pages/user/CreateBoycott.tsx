import { Box, Button, Container, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { createBoycottStyles } from '../styles/CreateBoycottStyles';
import { getFilterCategories } from '../../services/boycottService';
import type { FilterCategories, simpleEntity } from '../../types';
import EntitySearchBar from '../../components/user/EntitySearchBar';
import { mockEntities } from '../../data/mockEntities';

type Step = 1 | 2;

const entityOptions = ['Company', 'Organization', 'Person', 'Institution', 'Government', 'Other'];

export default function CreateBoycott() {
  const theme = useTheme();
  const evidenceInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [entity, setEntity] = useState('Other');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [industryId, setIndustryId] = useState<number | null>(null);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [isDraggingEvidence, setIsDraggingEvidence] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<simpleEntity | null>(null);
  const [searchCategoryId, setSearchCategoryId] = useState<number | null>(null);

  const [filterCategories, setFilterCategories] = useState<FilterCategories>();
  
  useEffect(() => {
    getFilterCategories().then(setFilterCategories);
  }, []);

  const countries = filterCategories?.countries ?? [];
  const industries = filterCategories?.industries ?? [];
  const injustices = filterCategories?.injustices ?? [];

  const isFirstStep = step === 1;

  const addEvidenceFiles = (files: FileList | File[]) => {
    const incomingFiles = Array.from(files);

    if (!incomingFiles.length) {
      return;
    }

    setEvidenceFiles((currentFiles: File[]) => [...currentFiles, ...incomingFiles]);
  };

  const handleEvidenceClick = () => {
    evidenceInputRef.current?.click();
  };

  const handleEvidenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addEvidenceFiles(event.target.files);
    }

    event.target.value = '';
  };

  const handleEvidenceDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingEvidence(true);
  };

  const handleEvidenceDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingEvidence(false);
  };

  const handleEvidenceDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingEvidence(false);
    if (event.dataTransfer.files) {
      addEvidenceFiles(event.dataTransfer.files);
    }
  };

  const getCategoryName = (id: number | null): string => {
    if (!id) return '';
    return injustices.find(c => c.id === id)?.name || '';
  };

  const getIndustryName = (id: number | null): string => {
    if (!id) return '';
    return industries.find(i => i.id === id)?.name || '';
  };

  const getCountryName = (id: number | null): string => {
    if (!id) return '';
    return countries.find(c => c.id === id)?.name || '';
  };

const getCategoryIdFromName = (categoryName: string): number | null => {
  const categoryMap: Record<string, number> = {
    'Company': 1,
    'Organization': 2,
    'Person': 3,
    'Institution': 4,
    'Government': 5,
    'Other': 6,
  };
  return categoryMap[categoryName] || null;
};

const getCategoryNameFromId = (categoryId: number): string => {
  const categoryMap: Record<number, string> = {
    1: 'Company',
    2: 'Organization',
    3: 'Person',
    4: 'Institution',
    5: 'Government',
    6: 'Other',
  };
  return categoryMap[categoryId] || 'Unknown';
};

  return (
    <Container sx={createBoycottStyles.mainContainer(theme)}>
      <Container sx={createBoycottStyles.panel(theme)}>
        <Typography sx={createBoycottStyles.breadcrumb()}>
          Create <Box component="span" sx={{ color: '#ffffff' }}> &gt; </Box>
          <Box component="span" sx={isFirstStep ? createBoycottStyles.breadcrumbActive(theme) : { color: '#ffffff' }}>General</Box>
          {!isFirstStep && (
            <>
              <Box component="span" sx={{ color: '#ffffff' }}> &gt; </Box>
              <Box component="span" sx={createBoycottStyles.breadcrumbActive(theme)}>Details</Box>
            </>
          )}
        </Typography>

        {isFirstStep ? (
          <>
            <Typography sx={createBoycottStyles.title()}>General information</Typography>
            <Typography sx={createBoycottStyles.subtitle()}>
              Complete the basic information about the boycott. Details of the complaint are added in the next step.
            </Typography>

            <Box sx={createBoycottStyles.formSection()}>
              {/* Category (Injustice) */}
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Category</Typography>
                <TextField
                  select
                  fullWidth
                  value={categoryId ?? ''}
                  onChange={(event) => setCategoryId(event.target.value ? Number(event.target.value) : null)}
                  sx={createBoycottStyles.textField(theme)}
                  slotProps={{
                    select: {
                      MenuProps: {
                        slotProps: {
                          paper: {
                            sx: createBoycottStyles.selectMenuPaper(),
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {injustices.map((injustice) => (
                    <MenuItem key={injustice.id} value={injustice.id}>
                      {injustice.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Industry */}
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Industry</Typography>
                <TextField
                  select
                  fullWidth
                  value={industryId ?? ''}
                  onChange={(event) => setIndustryId(event.target.value ? Number(event.target.value) : null)}
                  sx={createBoycottStyles.textField(theme)}
                  slotProps={{
                    select: {
                      MenuProps: {
                        slotProps: {
                          paper: {
                            sx: createBoycottStyles.selectMenuPaper(),
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {industries.map((industry) => (
                    <MenuItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Country */}
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Country</Typography>
                <TextField
                  select
                  fullWidth
                  value={countryId ?? ''}
                  onChange={(event) => setCountryId(event.target.value ? Number(event.target.value) : null)}
                  sx={createBoycottStyles.textField(theme)}
                  slotProps={{
                    select: {
                      MenuProps: {
                        slotProps: {
                          paper: {
                            sx: createBoycottStyles.selectMenuPaper(),
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: '18px' }}>
                <Button
                  onClick={() => setStep(2)}
                  sx={createBoycottStyles.primaryButton(theme)}
                >
                  Next step
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={createBoycottStyles.title()}>Complaint details</Typography>
            <Typography sx={createBoycottStyles.subtitle()}>
              Please provide all necessary details before creating the boycott.
            </Typography>

            <Box>
              <Typography sx={createBoycottStyles.fieldLabel()}>Entity Type</Typography>
              <Box sx={createBoycottStyles.entityGrid}>
                {entityOptions.map((option) => {
                  const categoryId = getCategoryIdFromName(option);
                  return (
                    <Button
                      key={option}
                      onClick={() => {
                        setTimeout(() => {
                          setSearchCategoryId(categoryId);
                          setSelectedEntity(null);
                        }, 0);
                      }}
                      sx={createBoycottStyles.entityButton(theme, searchCategoryId === categoryId)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={createBoycottStyles.fieldLabel()}>Search Entity</Typography>
                {searchCategoryId && (
                  <EntitySearchBar
                    selectedEntity={selectedEntity}
                    onEntityChange={setSelectedEntity}
                    categoryId={searchCategoryId}
                    placeholder="Search in this category..."
                  />
                )}
                {!searchCategoryId && (
                  <TextField
                    fullWidth
                    disabled
                    placeholder="Select an entity type first"
                    sx={createBoycottStyles.textField(theme)}
                  />
                )}
              {selectedEntity && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Selected: {selectedEntity.name} ({getCategoryNameFromId(selectedEntity.categoryId)})
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={createBoycottStyles.formSection()}>
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Title</Typography>
                <TextField
                  fullWidth
                  placeholder='Title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  sx={createBoycottStyles.textarea(theme)}
                />
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={6}
                  placeholder="Type a detailed description of the injustice.."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  sx={createBoycottStyles.textarea(theme)}
                />
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Evidence</Typography>
                <Box
                  sx={isDraggingEvidence ? createBoycottStyles.uploadBoxActive(theme) : createBoycottStyles.uploadBox()}
                  onClick={handleEvidenceClick}
                  onDragOver={handleEvidenceDragOver}
                  onDragLeave={handleEvidenceDragLeave}
                  onDrop={handleEvidenceDrop}
                  role="button"
                  tabIndex={0}
                >
                  <input
                    ref={evidenceInputRef}
                    type="file"
                    multiple
                    hidden
                    onChange={handleEvidenceChange}
                  />

                  <Box sx={createBoycottStyles.uploadContent}>
                    <Typography sx={{ color: '#ffffff', fontWeight: 700 }}>
                      Drag and drop files here or click to browse
                    </Typography>
                    <Typography sx={createBoycottStyles.uploadHint}>
                      You can attach images, documents and other evidence files
                    </Typography>

                    {evidenceFiles.length > 0 && (
                      <Box sx={createBoycottStyles.uploadFileList}>
                        {evidenceFiles.map((file, index) => (
                          <Box key={`${file.name}-${index}`} sx={createBoycottStyles.uploadFileItem(theme)}>
                            <Typography sx={createBoycottStyles.uploadFileName} noWrap>
                              {file.name}
                            </Typography>
                            <Typography sx={createBoycottStyles.uploadFileMeta}>
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={createBoycottStyles.footerActions}>
                <Button
                  onClick={() => setStep(1)}
                  sx={{ ...createBoycottStyles.outlineButton(theme), minWidth: { xs: '100%', md: '180px' } }}
                >
                  Back
                </Button>

                <Button sx={createBoycottStyles.postButton(theme)}>
                  Post
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Container>
  );
}