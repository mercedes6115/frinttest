import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        //# 1. 
        this.state = {
            title: '',
            content: '',
            writer: ''
        }

        //# 2.
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeWriterHandler = this.changeWriterHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }
    //# 3. 
    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }
    //# 3. 
    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }
    //# 3.
    changeWriterHandler = (event) => {
        this.setState({writer: event.target.value});
    }
    //# 4. 
    createBoard = (event) => {
        event.preventDefault();
        let board = {
            title: this.state.title,
            content: this.state.content,
            writer: this.state.writer
        };
        console.log("board => "+ JSON.stringify(board));
        BoardService.createBoard(board).then(res => {
            this.props.history.push('/board');
        });
    }

   // # 5. 
    cancel() {
        this.props.history.push('/board');
    }


    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">새글을 작성해주세요</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> 게시글 제목 </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 컨텐츠  </label>
                                        <textarea placeholder="content" name="content" className="form-control"
                                        value={this.state.content} onChange={this.changeContentHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 작성자 </label>
                                        <input placeholder="writer" name="writer" className="form-control"
                                        value={this.state.writer} onChange={this.changeWriterHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoard}>저장</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>취소</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateBoardComponent;
