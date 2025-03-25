import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface ChangePasswordDialogProps {
  open: boolean;
  handleClose: () => void;
  t: (key: string) => string;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  handleClose,
  t,
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError(t("no-match"));
      return;
    }

    // CALL API HERE
    

    handleCloseInternal();
  };

  const handleCloseInternal = () => {
    setPassword("");
    setConfirmPassword("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseInternal}>
      <DialogTitle>{t("change-password")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label={t("password")}
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label={t("confirm-password")}
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {error && (
            <Box mt={2}>
              <Typography variant="body2" color="error">
                {t(error)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInternal} color="primary">
            {t("close")}
          </Button>
          <Button type="submit" color="primary">
            {t("save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog;
