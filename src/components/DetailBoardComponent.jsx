import React, {Component} from 'react';
import BoardService from "../service/BoardService";
/*
컴포넌트가 생성 되었을 때 리액트가 동작하는 방식입니다.

1) 컴포넌트를 초기화 합니다. (constructor를 통해 state를 초기화, 기본 프롭스값)

2) componentWillMount API 가 실행 됩니다.

이  API 는 컴포넌트가 DOM 위에 만들어 지기 전에 실행되는 API 입니다.

* 이 단계에서 DOM 처리는 불가능 합니다.

3) 렌더링을 진행합니다.

4) componentDidMount 는 렌더링이 완료되고 실행되는 API 입니다.

* 이 단계에서 다른 자바스크립트 프레임워크와 연동 및 setTimeout, setInteval, AJAX 등을 사용합니다.

* DOM 처리가 가능합니다.
*/
class DetailBoardComponent extends Component {
    constructor(props) {
        super(props)
        // # 1. 페이지에 표시될 글 목록 데이터를 넣기위한 변수 'boards'를 this.state에 선언
        this.state = {
            id: this.props.match.params.boardId,
            board: {
                title : '',
                content : '',
                writer : ''
            }
        }
        console.log("===========DetailBoardComponent============="+ this.state.board.title);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeWriterHandler = this.changeWriterHandler.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
    }
   
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
    modifyBoard = (event) => {
        this.props.history.push('/modify-board/' + this.state.id);
    }

    deleteBoard = (event) => {
        event.preventDefault();
        let board = {
            title: this.state.board.title,
            content: this.state.board.content,
            writer: this.state.board.writer
        };
        
        let boardId = this.state.id;
        console.log("board => "+ JSON.stringify(board) + boardId);
        BoardService.deleteBoard(boardId,board).then(res => {
            this.props.history.push('/board');
        });
    }  
    componentDidMount() {
        BoardService.detailBoard(this.state.id).then((res) => {
            this.setState({ board: res.data});
            console.log("===========didMountBoardComponent============="+ this.state.board.title);
        });
    }
    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3" style={{height:"500px"}}>
                            <h3 className="text-center">새글을 작성해주세요</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> 게시글 제목 </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" 
                                               value={this.state.board.title} onChange={this.changeTitleHandler} readOnly={true}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 컨텐츠  </label>
                                        <textarea placeholder="content" name="content" className="form-control" 
                                                  value={this.state.board.content}  onChange={this.changeContentHandler} readOnly={true}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 작성자 </label>
                                        <input placeholder="writer" name="writer" className="form-control" 
                                               value={this.state.board.writer} onChange={this.changeWriterHandler} readOnly={true}/>
                                    </div>
                                </form>
                                <div>
                                    <button className="btn btn-warning" onClick={this.modifyBoard}> Modify</button>
                                    <button className="btn btn-danger" onClick={this.deleteBoard}> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default DetailBoardComponent;