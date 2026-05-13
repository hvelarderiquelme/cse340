-- ==============================
-- Organazitaion Table
-- ==============================

CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

-- ======================================
-- Insert sample data: Organizations
-- ======================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ==============================
-- Project Table
-- ==============================

-- CREATE TABLE project (
-- 	project_id SERIAL PRIMARY KEY,
-- 	organization_id INTEGER NOT NULL, 
-- 	title VARCHAR(150) NOT NULL,
-- 	description TEXT NOT NULL,
-- 	location VARCHAR(255) NOT NULL,
-- 	date DATE NOT NULL,

-- 	CONSTRAINT fk_project_organization
--         FOREIGN KEY (organization_id)
--         REFERENCES organization(organization_id)
	
-- );
-- 
INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES

-- =========================================
-- BrightFuture Builders (organization_id = 1)
-- =========================================
(
    1,
    'Community Center Renovation',
    'Renovating an aging community center using sustainable construction materials.',
    'Calgary, Alberta',
    '2026-06-15'
),
(
    1,
    'Affordable Housing Initiative',
    'Building affordable housing units for low-income families.',
    'Edmonton, Alberta',
    '2026-07-20'
),
(
    1,
    'Playground Restoration',
    'Restoring public playgrounds with safer and eco-friendly equipment.',
    'Red Deer, Alberta',
    '2026-08-10'
),
(
    1,
    'Bridge Safety Upgrade',
    'Upgrading pedestrian bridges to improve accessibility and safety.',
    'Lethbridge, Alberta',
    '2026-09-05'
),
(
    1,
    'Solar School Retrofit',
    'Installing solar panels and energy-efficient systems in schools.',
    'Medicine Hat, Alberta',
    '2026-10-01'
),

-- =========================================
-- GreenHarvest Growers (organization_id = 2)
-- =========================================
(
    2,
    'Downtown Rooftop Garden',
    'Creating rooftop gardens to promote urban agriculture.',
    'Calgary, Alberta',
    '2026-05-25'
),
(
    2,
    'Community Greenhouse Program',
    'Building greenhouses for year-round food production.',
    'Edmonton, Alberta',
    '2026-06-18'
),
(
    2,
    'School Garden Expansion',
    'Expanding educational gardens in elementary schools.',
    'Airdrie, Alberta',
    '2026-07-12'
),
(
    2,
    'Neighborhood Compost Initiative',
    'Launching a compost collection and education program.',
    'Okotoks, Alberta',
    '2026-08-08'
),
(
    2,
    'Urban Orchard Project',
    'Planting fruit trees in public spaces for community access.',
    'Banff, Alberta',
    '2026-09-14'
),

-- =========================================
-- UnityServe Volunteers (organization_id = 3)
-- =========================================
(
    3,
    'Winter Clothing Drive',
    'Organizing volunteers to distribute winter clothing to shelters.',
    'Calgary, Alberta',
    '2026-11-01'
),
(
    3,
    'Senior Support Visits',
    'Coordinating volunteers to assist isolated seniors.',
    'Edmonton, Alberta',
    '2026-06-30'
),
(
    3,
    'Food Bank Volunteer Campaign',
    'Recruiting volunteers for local food bank operations.',
    'Red Deer, Alberta',
    '2026-07-22'
),
(
    3,
    'Community Cleanup Day',
    'Hosting neighborhood cleanup and beautification events.',
    'Canmore, Alberta',
    '2026-08-16'
),
(
    3,
    'Back-to-School Supply Drive',
    'Collecting and distributing school supplies for children in need.',
    'Lethbridge, Alberta',
    '2026-09-03'
);
-- select * from project
