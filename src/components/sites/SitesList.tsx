import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createColumnHelper } from '@tanstack/react-table';
import { SITES, type Site } from '../../data/mockData.ts';
import DataGrid from '../dataGrid/DataGrid.tsx';
import DetailEditDrawer from '../detailEditDrawer/DetailEditDrawer.tsx';

const columnHelper = createColumnHelper<Site>();
const columns = [
  columnHelper.accessor('code', { header: 'Code' }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor((row) => row.updatedAt.split(' ')[0], { id: 'updated', header: 'Updated' }),
];

function validateSite(site: Site, allSites: Site[]): string[] {
  const errors: string[] = [];
  if (!site.code.trim()) errors.push('Site code is required.');
  else if (allSites.some((s) => s.id !== site.id && s.code.trim().toLowerCase() === site.code.trim().toLowerCase())) {
    errors.push('Site code must be unique within the tenant.');
  }
  if (!site.name.trim()) errors.push('Name is required.');
  return errors;
}

export default function SitesList() {
  const [sites, setSites] = useState(SITES);
  const [selected, setSelected] = useState<Site | null>(null);
  const [draft, setDraft] = useState<Site | null>(null);
  const [mode, setMode] = useState<'read' | 'edit'>('read');
  const [saveAttempted, setSaveAttempted] = useState(false);

  const isUnchanged = JSON.stringify(draft) === JSON.stringify(selected);
  const errors = draft ? validateSite(draft, sites) : [];

  const openSite = (site: Site) => {
    setSelected(site);
    setDraft({ ...site });
    setMode('read');
    setSaveAttempted(false);
  };
  const closeDrawer = () => {
    setSelected(null);
    setMode('read');
  };
  const handleCancel = () => {
    if (selected) setDraft({ ...selected });
    setMode('read');
    setSaveAttempted(false);
  };
  const handleSave = () => {
    if (errors.length > 0) {
      setSaveAttempted(true);
      return;
    }
    setSites((prev) => prev.map((s) => (s.id === draft!.id ? draft! : s)));
    setSelected(draft);
    setMode('read');
    setSaveAttempted(false);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 2 }}>Sites</Typography>
      <DataGrid data={sites} columns={columns} onRowClick={openSite} />
      {selected && draft && (
        <DetailEditDrawer
          open
          title={draft.code}
          mode={mode}
          onClose={closeDrawer}
          onEdit={() => setMode('edit')}
          onCancel={handleCancel}
          onSave={handleSave}
          saveDisabled={isUnchanged}
          closeDisabled={mode === 'edit' && !isUnchanged}
          validationMessage={saveAttempted && errors.length > 0 ? errors.join(' ') : undefined}
          updatedAt={draft.updatedAt}
          rowVersion={draft.rowVersion}
        >
          <TextField
            label="Site code"
            value={draft.code}
            onChange={(e) => setDraft({ ...draft, code: e.target.value })}
            disabled={mode === 'read'}
            size="small"
            fullWidth
          />
          <TextField
            label="Name"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            disabled={mode === 'read'}
            size="small"
            fullWidth
          />
        </DetailEditDrawer>
      )}
    </Box>
  );
}
