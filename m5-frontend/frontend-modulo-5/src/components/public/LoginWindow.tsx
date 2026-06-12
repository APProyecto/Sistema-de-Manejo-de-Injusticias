import {
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { loginWindowStyles } from "../styles/LoginWindowStyles";
import CloseIcon from "@mui/icons-material/Close";
import googleLogo from "../../assets/google.svg";
import AuthLogo from "../../assets/auth0.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { login as loginService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface LoginWindowProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}

function UserAgreementDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>User Agreement</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary.main', mb: 3 }}>
          Last updated: June 2026
        </Typography>

        {[
          {
            title: "1. Purpose of the Platform",
            body: "This platform exists to allow users to report, document, and raise awareness about social injustices through evidence-based complaints. Our goal is to provide a transparent, respectful, and legally conscious space for social accountability."
          },
          {
            title: "2. Eligibility",
            body: "You must be at least 18 years old to use this platform. By creating an account, you confirm that the information you provide is accurate and that you are legally capable of entering into this agreement."
          },
          {
            title: "3. Acceptable Use",
            body: "You agree to use this platform only to report genuine social injustices supported by real evidence. You may not use the platform to harass, defame, or target individuals based on personal disputes unrelated to social injustice. All complaints must be submitted in good faith."
          },
          {
            title: "4. Prohibited Content",
            body: "The following content is strictly forbidden:\n• Explicit sexual content of any kind\n• Content that sexualizes or endangers minors\n• Graphic violence or gore not directly relevant to a reported injustice\n• Hate speech based on race, gender, religion, sexual orientation, disability, or nationality\n• Doxxing or sharing private personal information without consent\n• False or fabricated evidence intended to defame\n• Spam, advertising, or off-topic submissions"
          },
          {
            title: "5. Evidence and Accuracy",
            body: "You are solely responsible for the accuracy of the information and evidence you submit. Submitting knowingly false information may result in permanent account suspension and may expose you to legal liability. We reserve the right to remove any content that we determine to be false, misleading, or in violation of this agreement."
          },
          {
            title: "6. Intellectual Property",
            body: "By submitting content to this platform, you grant us a non-exclusive, royalty-free license to display and distribute that content for the purposes of operating the platform. You retain ownership of your original content. Do not upload content you do not have the right to share."
          },
          {
            title: "7. Privacy",
            body: "We collect only the information necessary to operate the platform. We do not sell your personal data to third parties. Please review our Privacy Policy for full details on how your data is stored and used."
          },
          {
            title: "8. Account Suspension",
            body: "We reserve the right to suspend or permanently ban any account that violates this agreement, engages in abusive behavior, or submits content that endangers others — without prior notice when the violation is severe."
          },
          {
            title: "9. Limitation of Liability",
            body: "This platform facilitates the reporting of injustices but does not guarantee any legal outcome or official action. We are not liable for decisions made by third parties based on content published here. Use of this platform does not constitute legal advice."
          },
          {
            title: "10. Changes to This Agreement",
            body: "We may update this agreement periodically. Continued use of the platform after changes are posted constitutes acceptance of the updated terms. We will notify users of significant changes via email or an in-app notice."
          },
        ].map(({ title, body }) => (
          <Box key={title} sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>{title}</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{body}</Typography>
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function LoginWindow({ open, onClose, onLoginSuccess }: LoginWindowProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreementOpen, setAgreementOpen] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const theme = useTheme();

  const handleAuth0Login = () => {
    setError("");
    sessionStorage.removeItem("auth0LoggingOut");
    loginWithRedirect({ appState: { returnTo: "/profile" } });
  };

  const handleLogin = async () => {
    setError("");
    try {
      const response = await loginService(email, password);
      const loggedUser = login(response.user);
      onLoginSuccess(loggedUser);
      (document.activeElement as HTMLElement)?.blur();
      setSuccess("Logged in successfully!");
      onClose();
      if (loggedUser.isAdmin) navigate("/admin/dashboard");
      else navigate("/profile");
    } catch {
      setError("Incorrect credentials");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    try {
      const result = await fetch(`${import.meta.env.VITE_API_MODULE1}/api/users/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await result.json();
      if (result.ok) {
        const loggedUser = login(data.user);
        onLoginSuccess(loggedUser);
        (document.activeElement as HTMLElement)?.blur();
        onClose();
        if (loggedUser.isAdmin) navigate("/admin/dashboard");
        else navigate("/profile");
      } else {
        setError(data.error || "Google login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <>
      <UserAgreementDialog open={agreementOpen} onClose={() => setAgreementOpen(false)} />

      <Dialog sx={loginWindowStyles.dialog(theme)} open={open} onClose={onClose}>
        <DialogContent sx={loginWindowStyles.dialogContent(theme)}>
          <IconButton onClick={onClose} sx={loginWindowStyles.closeButton(theme)}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h2">Log In</Typography>
          <Typography variant="body1" sx={loginWindowStyles.typography(theme)}>
            By continuing, you agree to our{" "}
            <Typography
              component="span"
              onClick={() => setAgreementOpen(true)}
              sx={{
                ...loginWindowStyles.highlighted(theme),
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': { opacity: 0.8 },
              }}
            >
              User Agreement
            </Typography>{" "}
            and acknowledge that you understand the Privacy Policy
          </Typography>

          <Button sx={loginWindowStyles.auth0Button(theme)} onClick={handleAuth0Login}>
            <img src={AuthLogo} width={30} height={30} />
            <Typography sx={loginWindowStyles.textButton(theme)}>Continue with Auth0</Typography>
          </Button>

          <Box sx={{ position: "relative", width: "81%", minWidth: "200px" }}>
            <Box sx={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed")} />
            </Box>
            <Button sx={loginWindowStyles.googleButton(theme)}>
              <img src={googleLogo} width={30} height={30} />
              <Typography sx={loginWindowStyles.textButton(theme)}>Continue with Google</Typography>
            </Button>
          </Box>

          <Divider sx={loginWindowStyles.divider(theme)}>
            <Typography>OR</Typography>
          </Divider>

          <TextField
            sx={loginWindowStyles.textField(theme)}
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email"
            variant="filled"
            size="small"
          />
          <TextField
            sx={loginWindowStyles.textField(theme)}
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
            type="password"
            variant="filled"
            size="small"
          />

          <Button sx={loginWindowStyles.secundaryButton(theme)} onClick={handleLogin}>
            Log In
          </Button>

          {success && (
            <Alert severity="success" onClose={() => setSuccess("")} sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" onClose={() => setError("")} sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}