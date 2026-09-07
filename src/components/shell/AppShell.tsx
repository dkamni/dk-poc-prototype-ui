import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import { Link, Outlet } from '@tanstack/react-router';
import { useMsal } from '@azure/msal-react';
import { palette } from '../../tokens.ts';

const NAV_GROUPS = [
  {
    key: 'masterData',
    label: 'Master Data',
    items: [
      { to: '/sites', label: 'Sites' },
      { to: '/workcentres', label: 'Workcentres' },
      { to: '/products', label: 'Products' },
      { to: '/customers', label: 'Customers' },
    ],
  },
  { key: 'orders', label: 'Orders', items: [{ to: '/orders', label: 'Sales orders' }] },
  { key: 'planning', label: 'Planning', items: [{ to: '/schedule', label: 'Schedule' }] },
] as const;

const EXPANDED_WIDTH = 200;
const COLLAPSED_WIDTH = 56;
const HEADING_FONT = "'Barlow Condensed', system-ui, sans-serif";
const BODY_FONT = "'Barlow', system-ui, sans-serif";

// A 1px vertical rule on the dark top bar, matching the mockup's group separators.
function TopBarDivider() {
  return <Box sx={{ width: '1px', height: 20, bgcolor: 'rgba(255,255,255,0.3)' }} />;
}

export default function AppShell() {
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  // Matches the mockup's default: Master Data and Orders start expanded, Planning starts collapsed.
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ masterData: true, orders: true });
  const sidebarWidth = sidebarExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: BODY_FONT, bgcolor: palette.pageBg }}>
      <Box
        sx={{
          flex: 'none', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: '20px', bgcolor: palette.navBg, color: palette.white, fontSize: 13,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Typography sx={{ fontFamily: HEADING_FONT, fontWeight: 600, fontSize: 16 }}>Essentials POC</Typography>
          <TopBarDivider />
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
            <Box component="span" sx={{ opacity: 0.5, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tenant</Box>
            <Box component="span" sx={{ fontWeight: 500 }}>{account?.tenantId}</Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
            <Box component="span" sx={{ fontWeight: 500 }}>{account?.name}</Box>
            <Box component="span" sx={{ opacity: 0.5 }}>Production Planner</Box>
          </Box>
          <TopBarDivider />
          <Button sx={{ color: palette.white, fontFamily: BODY_FONT, fontWeight: 500, fontSize: 13, textTransform: 'none', p: 0, minWidth: 0 }} onClick={() => instance.logoutRedirect()}>
            Sign out
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Box
          sx={{
            flex: 'none', width: sidebarWidth, transition: 'width 150ms ease',
            bgcolor: palette.pageBg, borderRight: 1, borderColor: 'divider',
            display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto',
          }}
        >
          <Box sx={{ p: '10px', flex: 'none' }}>
            <IconButton onClick={() => setSidebarExpanded((v) => !v)} aria-label="Toggle navigation" sx={{ p: '9px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
              </svg>
            </IconButton>
          </Box>
          {sidebarExpanded && (
            <List sx={{ px: 1, pt: 0 }}>
              {NAV_GROUPS.map((group) => {
                const isOpen = openGroups[group.key];
                return (
                  <Box key={group.key}>
                    <ListItemButton
                      onClick={() => setOpenGroups((g) => ({ ...g, [group.key]: !g[group.key] }))}
                      sx={{ pl: '12px', pr: '12px', py: '6px', borderRadius: 1, textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.04em', opacity: 0.7 }}
                    >
                      {group.label}
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ marginLeft: 'auto', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 150ms ease' }}
                      >
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </ListItemButton>
                    <Collapse in={isOpen}>
                      {group.items.map((item) => (
                        <ListItemButton
                          key={item.to}
                          component={Link}
                          to={item.to}
                          sx={{ pl: '32px', pr: '12px', py: '6px', borderRadius: 1, fontSize: 14 }}
                          activeProps={{ sx: { bgcolor: palette.navActiveBg, color: palette.navActiveText, fontWeight: 600 } }}
                        >
                          {item.label}
                        </ListItemButton>
                      ))}
                    </Collapse>
                  </Box>
                );
              })}
            </List>
          )}
        </Box>

        <Box component="main" sx={{ flex: 1, minWidth: 0, overflow: 'auto', p: '20px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}


