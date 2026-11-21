export const INSTALLATION_GUIDES = {
  solidworksFusion360: {
    label: 'Open SolidWorks / Fusion 360 Installation Guide',
    url: 'https://github.com/aero-modelling-iitbhu/Winter_Camp_2026/blob/main/installations/solidworks_fusion360_setup_2026.md',
  },
  ubuntuWindows: {
    label: 'View Ubuntu 22.04 Windows Dual-Boot Guide',
    url: 'https://github.com/aero-modelling-iitbhu/Winter_Camp_2026/blob/main/installations/ubuntu_2204_windows_dual_boot_winter_camp.md',
  },
  ubuntuMac: {
    label: 'View Ubuntu 22.04 Setup for Mac',
    url: 'https://github.com/aero-modelling-iitbhu/Winter_Camp_2026/blob/main/installations/mac_ubuntu_setup_winter_camp.md',
  },
  ros2: {
    label: 'Open ROS 2 Installation and Setup Guide',
    url: 'https://github.com/aero-modelling-iitbhu/Winter_Camp_2026/blob/main/installations/ros2_winter_camp_setup.md',
  },
} as const;

export interface HelpChannelConfig {
  label: string;
  url: string;
}

/**
 * Configurable placeholder for the official camp troubleshooting / help channel.
 * Populate `url` when the official coordinator help link is ready.
 */
export const OFFICIAL_HELP_CHANNEL: HelpChannelConfig = {
  label: 'Official Winter Camp Coordinator Help Channel (Link will be shared upon release)',
  url: '',
};
