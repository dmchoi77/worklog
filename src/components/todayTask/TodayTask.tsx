const TodayTask = () => {
  return (
    <div>
      <h2>Task</h2>
      {['업무1', '업무2', '업무3'].map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
};

export default TodayTask;
