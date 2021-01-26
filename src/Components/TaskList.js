const TaskList = props => {
    return (
        <div>
        {props.emptyLi}
        {props.liGenerator}
        </div>
    )
}
export default TaskList;