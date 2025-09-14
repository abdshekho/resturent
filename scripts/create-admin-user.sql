-- Create default super admin user
-- This script should be run once to create the initial admin account

INSERT INTO admins (name, email, password, created_at, updated_at) 
VALUES (
  'Super Admin',
  'admin@restaurantos.com',
  '$2a$12$LQv3c1yqBwEHxv03kpDOCOvRh6SANVa.0Q0/8YCExqfelixmM.9EO', -- password: admin123
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE updated_at = NOW();
