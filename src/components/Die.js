const Die = (props) => {
  const styles = { backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" };
  return (
    <div
      className="die-face"
      style={{ backgroundColor: styles.backgroundColor }}
      onClick={props.holdDice}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
};

export default Die;
