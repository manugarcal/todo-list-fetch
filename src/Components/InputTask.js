

const InputTask = props => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className="form-group d-flex">
                    <input ref={props.iRef} type="text" className="form-control" onKeyUp={props.newItem} placeholder="add new task..." />
                    <button onClick={props.newItem} ref={props.iref} className='btn btn-success'><i className="fas fa-thumbtack"></i></button>
                </div>
            </form>
        </div>
    )
}
export default InputTask;