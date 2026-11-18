/**
 * @notice Shared Package Entry Point
 * @dev Re-exports all shared utilities, constants, theme tokens, UI components, and Auth context.
 */

// Theme & Tokens
export * from './constants/roles.js';
export * from './constants/statuses.js';
export * from './constants/collections.js';
export * from './constants/appUrls.js';

// Firebase Client
export * from './firebase/firebaseApp.js';

// Context
export * from './context/AuthContext.jsx';

// Utilities
export * from './utils/formatters.js';
export * from './utils/validators.js';
export * from './utils/statusRules.js';
export * from './utils/pricing.js';
export * from './utils/trackingNumber.js';
export * from './utils/imageCompress.js';

// UI Components
export * from './components/Button.jsx';
export * from './components/Input.jsx';
export * from './components/Select.jsx';
export * from './components/Card.jsx';
export * from './components/StatusBadge.jsx';
export * from './components/Table.jsx';
export * from './components/Modal.jsx';
export * from './components/Toast.jsx';
export * from './components/Tabs.jsx';
export * from './components/Timeline.jsx';
export * from './components/Stepper.jsx';
export * from './components/MapView.jsx';
export * from './components/Skeleton.jsx';
export * from './components/EmptyState.jsx';
export * from './components/ErrorState.jsx';
export * from './components/RoleGuard.jsx';
export * from './components/WrongAppNotice.jsx';
export * from './components/DesignSystemTestPage.jsx';
