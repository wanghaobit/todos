import React from 'react'
// import '../dist/todomvc-common/base.css'
// import '../dist/todomvc-app-css/index.css'
// import '../node_modules/todomvc-common/base.css'
// import '../node_modules/todomvc-app-css/index.css'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
export default class App extends React.Component{
    // constructor(props){
    //     super(props) 
	// }
	constructor(props){
        super(props)
        // 1. 将数据储存在我们的state状态里面
        this.state = {
			todos:props.data,
			newTodo:{},
			newTodos: []
        }
    }
    render(){
        return <div>
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				{/* <input className="new-todo" placeholder="What needs to be done?" autoFocus={true}/> */}
				<input 
				className="new-todo" 
				ref="addTodo"
				placeholder="What needs to be done?" 
				autoFocus={true}
				onKeyUp={(e)=>{this.addTodoHandle(e)}}/>
			</header>
			<section className="main">
				{/* <input id="toggle-all" className="toggle-all" type="checkbox" /> */}
				<input id="toggle-all" className="toggle-all" type="checkbox" defaultChecked={this.state.newTodos.every(t=>t.bool)} ref="selectedCheck"/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				{/* <ul className="todo-list">
					<li className="completed">
						<div className="view">
							<input className="toggle" type="checkbox" />
							<label>Taste JavaScript</label>
							<button className="destroy"></button>
						</div>
						<input className="edit" defaultValue="Create a TodoMVC template" />
					</li>
					<li>
						<div className="view">
							<input className="toggle" type="checkbox" />
							<label>Buy a unicorn</label>
							<button className="destroy"></button>
						</div>
						<input className="edit" defaultValue="Rule the web" />
					</li>
				</ul> */}
				<ul className="todo-list">
                {/* 1.1.循环我们的数据 */}
                	{this.state.todos.map((todo,index)=>{
						// return <li className={[todo.bool?"completed":"",this.state.newTodo==todo?"editing":""]} key={todo.id}>
						return <li className={(todo.bool?"completed":"")+" "+(this.state.newTodo==todo?"editing":"")} key={todo.id}>
						<div className="view">
							{/* <input className="toggle" type="checkbox" onChange={()=>{this.changeCheckHandle(index)}} defaultChecked={todo.bool}/> */}
							<input className="toggle" type="checkbox" onChange={()=>{this.changeCheckHandle(index)}} defaultChecked={todo.bool}/>
							<label onDoubleClick={()=>{this.editTodoHandle(todo)}}>{todo.do}</label>
							<button className="destroy" onClick={()=>{this.delTodoHandle}}></button>
						</div>
						<input 
						className="edit"  
						autoFocus 
						defaultValue={todo.do} 
						ref="editItem"
						onKeyUp = {(e)=>{this.editedHandle(e,index)}}
						/>
					</li>	
                	})}
				</ul>

			</section>
			<footer className="footer">
				{/* <span className="todo-count"><strong>0</strong> item left</span> */}
				<span className="todo-count"><strong>{this.state.todos.filter((t)=>!t.bool).length}</strong>item left</span>
				{/* <ul className="filters">
					<li>
						<a className="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul> */}
				<ul className="filters">
					<li>
						<a className={"/"==window.location.hash.substring(1)?"selected":""} href="#/" >All</a>
					</li>
					<li>
						<a className={"/active"==window.location.hash.substring(1)?"selected":""} href="#/active">Active</a>
					</li>
					<li>
						<a className={"/completed"==window.location.hash.substring(1)?"selected":""} href="#/completed">Completed</a>
					</li>
				</ul>
				{/* <button className="clear-completed">Clear completed</button> */}
				{/* <button className="clear-completed" onClick={this.clearCompletedHandle}>Clear completed</button> */}
				<button className="clear-completed" onClick={()=>{this.clearCompletedHandle()}}>Clear completed</button>

			</footer>
		</section>
		<footer className="info">
			<p>Double-click to edit a todo</p>
			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
			<p>Created by <a href="http://todomvc.com">you</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
        </div>
	}
	// changeCheckHandle = (index)=>{
    //     let todos = this.state.todos.map((item,i)=>{
	// 		if(i==index){
	// 			item.bool = !item.bool
	// 		}
	// 		return item
	// 	})
	// 	this.setState({
	// 		todos
	// 	})
		
    // }
	changeCheckHandle = (index)=>{
        let todos = this.state.todos.map((item,i)=>{
			if(i==index){
				item.bool = !item.bool
			}
			return item
		})
		this.setState({
			todos,
			newTodos:todos
		})
		this.refs.selectedCheck.checked=this.state.newTodos.every(t=>t.bool)
	}
	// 进入编辑状态
	editTodoHandle = (item)=>{
		this.refs.autofocus = true
		document.querySelectorAll('.edit')[0].autofocus = true
		document.querySelectorAll('.edit')[1].autofocus = true
		document.querySelectorAll('.edit')[2].autofocus = true
		this.setState({
			newTodo:item
		})
	}
	// 编辑完成
	editedHandle(e,index){
		// 如果是按退出键退出编辑状态=27
		if(e.keyCode==27){
			this.setState({
				newTodo:{}
			})
			return;
		}
		if(e.keyCode==13){
			let todos = this.state.todos.map((item,i)=>{
				if(i==index){
					item.do = e.target.value
				}
				return item
			})
			this.setState({
				todos,
				newTodos: todos,
				newTodo:{}
			})
		}	
	}
	delTodoHandle(index){
		let todos = this.state.todos
		todos.splice(index,1)
		// 保存数据
		this.setState({
			todos
		})
	}
	// clearCompletedHandle(){
	// 	let todos = this.state.todos.filter(t=>!t.bool)
	// 	this.setState({
	// 		todos
	// 	})
	// }
	clearCompletedHandle(){
		// console.log(this.state)
		let todos = this.state.todos.filter(t=>!t.bool)
		this.setState({
			todos,
			newTodos:todos
		})
	}
	hashChangeHandle(){
		// console.log(location.hash.startsWith('/active',1))
		// 这是正在完成项目，即未完成(bool:false)
		let newTodos = []
		if(location.hash.startsWith('/active',1)){
			newTodos = this.state.todos.filter(t=>!t.bool)
		}else if(location.hash.startsWith('/completed',1)){
			newTodos = this.state.todos.filter(t=>t.bool)
		}else{
			newTodos = this.state.todos
		}
		this.setState({
			newTodos
		})
	}
	componentWillMount(){
		this.hashChangeHandle()
	}
	componentDidMount(){
		window.onhashchange = function(){
			this.hashChangeHandle()
		}.bind(this)
	}
	addTodoHandle(e){
		//如果文本框为空或则不是使用enter不执行任何操作
		let addVal = this.refs.addTodo.value
		let todos = this.state.todos
		if(e.keyCode!==13 || !addVal.length){
			return;
		}
		let id = todos.length?todos[todos.length-1].id+1:1
		let todo = {
			id,
			do:addVal,
			bool:false
		}
		todos.push(todo)
		this.setState({
			todos,
			newTodos:todos
		})
		// 清空
		this.refs.addTodo.value = ''
	}
	// 全选
	toggleHandle = ()=>{
		let todos = this.state.todos
		let toggle = document.querySelectorAll('.toggle')
		todos.forEach(item => {
			item.bool = this.refs.selectedCheck.checked	
		})
		for(var i=0;i< toggle.length;i++){
			toggle[i].checked = this.refs.selectedCheck.checked	
		}
		this.setState({
			todos,
			newTodos:todos
		})
	}
	// shouldComponentUpdate(nextProps,nextState){
	// 	localStorage.setItem('todos',JSON.stringify(nextState.todos))
	// 	return true
	// }
	shouldComponentUpdate(nextProps,nextState){
		this.refs.selectedCheck.checked=this.state.newTodos.every(t=>t.bool)
		return true
	}

}
