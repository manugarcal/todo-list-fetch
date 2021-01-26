const DeleteAll = props => {

    return (
        <div className="d-flex justify-content-center mt-2 mb-2">
            <button onClick={props.deleteAll} className="btn btn-danger "><i className="fas fa-trash-alt"></i></button>
        </div>
    )
}
export default DeleteAll;