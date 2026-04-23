import Warn from './Warn.jsx';

export default {
  title: 'UI/Warn',
  component: Warn,
  tags: ['autodocs'],
};

export const Default = { args: { children: '보기를 먼저 골라줘!' } };
export const Long = { args: { children: '문제 불러오기 실패, 다시 시도해주세요' } };
