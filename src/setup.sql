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

CREATE TABLE project (
	project_id SERIAL PRIMARY KEY,
	organization_id INTEGER NOT NULL, 
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(255) NOT NULL,
	date DATE NOT NULL,

	CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
	
);

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
-- ==============================
-- Category Table
-- ==============================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- ======================================
-- Junction table project_category Table
-- ======================================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id),

    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

-- =========================================
-- INSERT CATEGORIES
-- =========================================

INSERT INTO category (name)
VALUES
('Infrastructure'),
('Environment'),
('Education'),
('Food Security'),
('Community Support'),
('Volunteer Work'),
('Housing');


-- =========================================
-- ASSOCIATE PROJECTS WITH CATEGORIES
-- =========================================
-- Assumes project_id values are 1–15
-- and category_id values are:
--
-- 1 = Infrastructure
-- 2 = Environment
-- 3 = Education
-- 4 = Food Security
-- 5 = Community Support
-- 6 = Volunteer Work
-- 7 = Housing
-- =========================================

INSERT INTO project_category (
    project_id,
    category_id
)
VALUES

-- =========================================
-- BrightFuture Builders Projects
-- =========================================

-- Community Center Renovation
(1, 1),
(1, 5),

-- Affordable Housing Initiative
(2, 7),
(2, 5),

-- Playground Restoration
(3, 1),
(3, 5),

-- Bridge Safety Upgrade
(4, 1),

-- Solar School Retrofit
(5, 2),
(5, 3),

-- =========================================
-- GreenHarvest Growers Projects
-- =========================================

-- Downtown Rooftop Garden
(6, 2),
(6, 4),

-- Community Greenhouse Program
(7, 2),
(7, 4),

-- School Garden Expansion
(8, 3),
(8, 2),

-- Neighborhood Compost Initiative
(9, 2),

-- Urban Orchard Project
(10, 2),
(10, 5),

-- =========================================
-- UnityServe Volunteers Projects
-- =========================================

-- Winter Clothing Drive
(11, 5),
(11, 6),

-- Senior Support Visits
(12, 5),
(12, 6),

-- Food Bank Volunteer Campaign
(13, 4),
(13, 6),

-- Community Cleanup Day
(14, 2),
(14, 6),

-- Back-to-School Supply Drive
(15, 3),
(15, 5);