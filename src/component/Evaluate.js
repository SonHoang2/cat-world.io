export default function Evaluate(props) {
    const data = () => {
        if (props.data) {
           return (
            <div className="pb-3">
                <h5 className="fw-bold d-inline">{props.name}</h5>
                <span className="fw-normal px-1">
                    {props.data + ' ' + (props.extra !== undefined ? props.extra : "")}
                </span>
            </div>
            )
        } 
        if (props.stadiums) {
            return (
                <div className="d-flex align-items-baseline pb-3">
                    <h5 className="fw-bold col-3">{props.name}</h5>
                    <div className="d-flex flex-row mx-2">
                        {props.stadiums}
                    </div>
                </div> 
            )
        }
    }

    return (
        <div>
            {data()}
        </div>
    )
}
