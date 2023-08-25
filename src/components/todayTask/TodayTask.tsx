const TodayTask = () => {
  return (
    <div>
      <div>Task</div>
      {['차세대가맹', '비씨카드', '소화물공제조합'].map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
};

export default TodayTask;
