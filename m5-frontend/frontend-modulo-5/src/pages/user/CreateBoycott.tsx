import { Box, Button, Container, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { createBoycottStyles } from '../styles/CreateBoycottStyles';
import { attachEvidenceToBoycott, createBoycott, getFilterCategories, uploadEvidenceFiles } from '../../services/boycottService';
import type { FilterCategories, simpleEntity } from '../../types';
import EntitySearchBar from '../../components/user/EntitySearchBar';
import { useAuth } from '../../context/authContext';
type Step = 1 | 2;

export default function CreateBoycott() {
  const theme = useTheme();
  const evidenceInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [categoryId, setCategoryId] = useState<number | null>(null); 
  const [industryId, setIndustryId] = useState<number | null>(null);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [isDraggingEvidence, setIsDraggingEvidence] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<simpleEntity | null>(null);
  const [searchCategoryId, setSearchCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterCategories, setFilterCategories] = useState<FilterCategories>();

  const entityOptions = ['Company', 'Organization', 'Person', 'Institution', 'Government', 'Other'];
  
  // Obtener el usuario actual (ajusta según tu auth)
  const { user } = useAuth(); 
  const userId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  useEffect(() => {
    getFilterCategories().then(setFilterCategories);
  }, []);

  const countries = filterCategories?.countries ?? [];
  const industries = filterCategories?.industries ?? [];
  const injustices = filterCategories?.injustices ?? [];

  const isFirstStep = step === 1;

  // Validar que todos los campos requeridos estén llenos
  const isStep2Valid = () => {
    return (
      selectedEntity !== null &&
      title.trim() !== '' &&
      description.trim() !== '' &&
      categoryId !== null &&
      categoryId > 0 &&
      countryId !== null &&
      countryId > 0
    );
  };

  // Manejar la creación del boycott
  const handleCreateBoycott = async () => {
    if (!isStep2Valid()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (!userId) {
      alert('No se pudo identificar el usuario para crear el boycott.');
      return;
    }

    setLoading(true);

    try {
      const boycottData = {
        title: title.trim(),
        description: description.trim(),
        creatorId: userId, // ← Cambiar de createdBy a creatorId
        entityId: selectedEntity!.id,
        countryId: countryId!,
        injusticeTypeId: categoryId!,
        boycottStateId: 1, // Activo
      };

      const result = await createBoycott(boycottData);

      const boycottId = Number(
        (result as any)?.boycottId ?? (result as any)?.id ?? (result as any)?.BoycottID
      );

      if (evidenceFiles.length > 0 && Number.isInteger(boycottId) && boycottId > 0) {
        const uploadedEvidence = await uploadEvidenceFiles(evidenceFiles);
        await attachEvidenceToBoycott(boycottId, uploadedEvidence);
      }
      
      console.log('Boycott creado:', result);
      
      // Mostrar mensaje de éxito
      alert('¡Boycott creado exitosamente!');
      
      // Redirigir o limpiar el formulario
      // router.push(`/boycotts/${result.id}`);
      
      // O limpiar el formulario
      // resetForm();
      
    } catch (error) {
      console.error('Error al crear boycott:', error);
      alert('Error al crear el boycott. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Resto de tus funciones existentes...
  const addEvidenceFiles = (files: FileList | File[]) => {
    const incomingFiles = Array.from(files);
    if (!incomingFiles.length) return;
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
                <Typography sx={createBoycottStyles.fieldLabel()}>Category *</Typography>
                <TextField
                  select
                  fullWidth
                  required
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
                  <MenuItem value="">Select a category</MenuItem>
                  {injustices.map((injustice) => (
                    <MenuItem key={injustice.id} value={injustice.id}>
                      {injustice.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Industry (Opcional) */}
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Industry (Optional)</Typography>
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
                <Typography sx={createBoycottStyles.fieldLabel()}>Country *</Typography>
                <TextField
                  select
                  fullWidth
                  required
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
                  <MenuItem value="">Select a country</MenuItem>
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
                  disabled={!categoryId || !countryId}
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
              <Typography sx={createBoycottStyles.fieldLabel()}>Entity Type *</Typography>
              <Box sx={createBoycottStyles.entityGrid}>
                {entityOptions.map((option) => {
                  const categoryIdFromName = getCategoryIdFromName(option);
                  return (
                    <Button
                      key={option}
                      onClick={() => {
                        setTimeout(() => {
                          setSearchCategoryId(categoryIdFromName);
                          setSelectedEntity(null);
                        }, 0);
                      }}
                      sx={createBoycottStyles.entityButton(theme, searchCategoryId === categoryIdFromName)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={createBoycottStyles.fieldLabel()}>Search Entity *</Typography>
              {searchCategoryId && (
                <EntitySearchBar
                  selectedEntity={selectedEntity}
                  onEntityChange={setSelectedEntity}
                  categoryId={searchCategoryId}
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
            </Box>

            <Box sx={createBoycottStyles.formSection()}>
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Title *</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder='Title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  sx={createBoycottStyles.textarea(theme)}
                />
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Description *</Typography>
                <TextField
                  fullWidth
                  required
                  multiline
                  minRows={6}
                  placeholder="Type a detailed description of the injustice.."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  sx={createBoycottStyles.textarea(theme)}
                />
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Evidence (Optional)</Typography>
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

                <Button 
                  onClick={handleCreateBoycott}
                  disabled={loading || !isStep2Valid()}
                  sx={createBoycottStyles.postButton(theme)}
                >
                  {loading ? 'Creating...' : 'Post'}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Container>
  );
}