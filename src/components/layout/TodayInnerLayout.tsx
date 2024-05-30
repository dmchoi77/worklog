const TodayInnerLayout = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>{children}</div>;
};

export default TodayInnerLayout;
