import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { palette } from '../../tokens.ts';

interface DetailDrawerProps {
  open: boolean;
  title: string;
  mode: 'read' | 'edit';
  onClose: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  saveDisabled: boolean;
  closeDisabled: boolean;
  validationMessage?: string;
  updatedAt: string;
  rowVersion: string;
  children: React.ReactNode;
}

// Shared read/edit detail drawer used by every master-data list view (Sites now; Workcentres,
// Products, Customers later) — only the field list (children) differs per entity.
export default function DetailEditDrawer({
  open, title, mode, onClose, onEdit, onCancel, onSave, saveDisabled, closeDisabled, validationMessage, updatedAt, rowVersion, children,
}: DetailDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={() => { if (!closeDisabled) onClose(); }}>
      <Box sx={{ width: 420, maxWidth: '90vw', height: '100%', boxSizing: 'border-box', p: '20px', display: 'flex', flexDirection: 'column', bgcolor: palette.pageBg }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: '14px' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{title}</Typography>
          <IconButton onClick={onClose} disabled={closeDisabled} aria-label="Close" sx={{ p: '9px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '14px' }}>
          {mode === 'read' ? (
            <Button variant="contained" onClick={onEdit}>Edit</Button>
          ) : (
            <Box sx={{ display: 'flex', gap: '7px' }}>
              <Button variant="outlined" sx={{ borderColor: palette.border, color: 'text.primary' }} onClick={onCancel}>Cancel</Button>
              <Button variant="contained" disabled={saveDisabled} onClick={onSave}>Save</Button>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {children}
          {validationMessage && (
            <Box sx={{ border: '1px solid', borderColor: palette.border, bgcolor: palette.zebra, p: '14px', fontSize: 14 }}>
              <strong>Validation:</strong> {validationMessage}
            </Box>
          )}
          <Box sx={{ display: 'flex', pt: '10px', borderTop: '1px solid', borderColor: palette.border, mt: '7px', fontSize: 13, opacity: 0.6 }}>
            <Box sx={{ width: 140 }}>Updated at</Box><Box>{updatedAt}</Box>
          </Box>
          <Box sx={{ display: 'flex', fontSize: 13, opacity: 0.6, mt: '-14px', wordBreak: 'break-all' }}>
            <Box sx={{ width: 140, flex: 'none' }}>Row version</Box><Box>{rowVersion}</Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
