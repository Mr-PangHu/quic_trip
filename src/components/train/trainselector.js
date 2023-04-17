export default function TrainSelector(props) {
  return (
    <div className="train-selector">
      <ul>
        {props.data.map((item, ind) => (
          <li key={`${ind}`}>
            <a
              onClick={() => {
                props.setInd(ind);
                // console.log(ind);
              }}
              className={props.ind == ind ? "active" : null}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
