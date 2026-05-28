import { Box, Button, Container, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { createBoycottStyles } from './CreateBoycottStyles';

type Step = 1 | 2;

const entityOptions = ['Company', 'Organization', 'Person', 'Institution', 'Government', 'Other'];
const categoryOptions = ['Other', 'Labor abuse', 'Environmental damage', 'Discrimination', 'Corruption'];
const countryOptions = ['Country', 'Palestine', 'United States', 'Mexico', 'Spain', 'Other'];
const complaintTypes = ['Type of injustice..', 'Labor exploitation', 'Harassment', 'Fraud', 'Environmental harm'];

export default function CreateBoycott() {
  const theme = useTheme();
  const evidenceInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [entity, setEntity] = useState('Other');
  const [category, setCategory] = useState('Other');
  const [title, setTitle] = useState('Boycott name...');
  const [type, setType] = useState('Type of injustice..');
  const [country, setCountry] = useState('Country');
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [isDraggingEvidence, setIsDraggingEvidence] = useState(false);

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

  return (
    <Container sx={createBoycottStyles.mainContainer(theme)}>
      <Container sx={createBoycottStyles.panel(theme)}>
        <Typography sx={createBoycottStyles.breadcrumb()}>
          Create boycott <Box component="span" sx={{ color: '#ffffff' }}> &gt; </Box>
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
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Title</Typography>
                <TextField
                  fullWidth
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  sx={createBoycottStyles.textField(theme)}
                />
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Category</Typography>
                <TextField
                  select
                  fullWidth
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
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
                  {categoryOptions.map((option) => (
                    <MenuItem key={option} value={option} sx={createBoycottStyles.selectMenuItem()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Entity</Typography>
                <Box sx={createBoycottStyles.entityGrid}>
                  {entityOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => setEntity(option)}
                      sx={createBoycottStyles.entityButton(theme, entity === option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
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

            <Box sx={createBoycottStyles.formSection()}>
              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Type</Typography>
                <TextField
                  select
                  fullWidth
                  value={type}
                  onChange={(event) => setType(event.target.value)}
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
                  {complaintTypes.map((option) => (
                    <MenuItem key={option} value={option} sx={createBoycottStyles.selectMenuItem()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={6}
                  placeholder="Type a detailed description of the injustice.."
                  sx={createBoycottStyles.textarea(theme)}
                />
              </Box>

              <Box>
                <Typography sx={createBoycottStyles.fieldLabel()}>Country</Typography>
                <TextField
                  select
                  fullWidth
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  sx={{ ...createBoycottStyles.textField(theme), maxWidth: { xs: '100%', md: '270px' } }}
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
                  {countryOptions.map((option) => (
                    <MenuItem key={option} value={option} sx={createBoycottStyles.selectMenuItem()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
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
                  Post Boycott
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Container>
  );
}