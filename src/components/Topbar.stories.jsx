import Topbar from './Topbar.jsx';

export default {
  title: 'Components/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Home = {
  parameters: { route: '/' },
};

export const StudyActive = {
  parameters: { route: '/study' },
};

export const LimitedActive = {
  parameters: { route: '/limited' },
};

export const InfiniteActive = {
  parameters: { route: '/infinite' },
};

export const CustomLogo = {
  args: { logo: 'ハンザワ' },
  parameters: { route: '/' },
};
