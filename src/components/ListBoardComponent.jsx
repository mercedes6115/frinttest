import React, { Component } from 'react';
import { Link } from "react-router-dom"
import BoardService from '../service/BoardService';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '@szhsin/react-menu/dist/index.css';

class ListBoardComponent extends Component {

    constructor(props) {
    //클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 함.
    //React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달합니다. 
    //이 객체를 “props”라고 합니다.
        super(props)
    //props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장합니다.
    // # 1. 페이지에 표시될 글 목록 데이터를 넣기위한 변수 'boards'를 this.state에 선언
        this.state = {
            boards: [],
            currentPage:0,
            keyword:'',
            type :'',
            totalPage:'',
        }
        this.createBoard = this.createBoard.bind(this);
        this.detailBoard = this.detailBoard.bind(this);
        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);
    }

    //화살표 함수
    //this나 super에 대한 바인딩이 없고, methods 로 사용될 수 없습니다.
    //new.target키워드가 없습니다.
    //일반적으로 스코프를 지정할 때 사용하는 call, apply, bind methods를 이용할 수 없습니다.
    //생성자(Constructor)로 사용할 수 없습니다.
    //yield를 화살표 함수 내부에서 사용할 수 없습니다.
    //기본 구문
    //(param1, param2, …, paramN) => { statements }
    //(param1, param2, …, paramN) => expression
    // 다음과 동일함:  => { return expression; }

    // 매개변수가 하나뿐인 경우 괄호는 선택사항:
    //(singleParam) => { statements }
    //singleParam => { statements }

    // 매개변수가 없는 함수는 괄호가 필요:
    //() => { statements }
    
    
    //고급 구문
    // 객체 리터럴 표현을 반환하기 위해서는 함수 본문(body)을 괄호 속에 넣음:
    //params => ({foo: bar})
    // 나머지 매개변수 및 기본 매개변수를 지원함
    //(param1, param2, ...rest) => { statements }
    //(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

    // 매개변수 목록 내 구조분해할당도 지원됨
    //var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
    //f();  // 6
    /*
    짧은 함수
    일부 함수 패턴에서는, 짧은 함수가 환영받습니다. 비교해 보세요:

    var elements = [
      'Hydrogen',
      'Helium',
      'Lithium',
      'Beryllium'
    ];

    // 이 문장은 배열을 반환함: [8, 6, 7, 9]
    elements.map(function(element) {
      return element.length;
    });

    // 위의 일반적인 함수 표현은 아래 화살표 함수로 쓸 수 있다.
    elements.map((element) => {
      return element.length;
    }); // [8, 6, 7, 9]

    // 파라미터가 하나만 있을 때는 주변 괄호를 생략할 수 있다.
    elements.map(element => {
      return element.length;
    }); // [8, 6, 7, 9]

    // 화살표 함수의 유일한 문장이 'return'일 때 'return'과
    // 중괄호({})를 생략할 수 있다.
    elements.map(element => element.length); // [8, 6, 7, 9]

    // 이 경우 length 속성만 필요하므로 destructuring 매개변수를 사용할 수 있다.
    // 'length'는 우리가 얻고자 하는 속성에 해당하는 반면,
    // lengthFooBArX'는 변경 가능한 변수의 이름일 뿐이므로
    // 원하는 유효한 변수명으로 변경할 수 있다.
    elements.map(({ length: lengthFooBArX }) => lengthFooBArX); // [8, 6, 7, 9]

    // destructuring 파라미터 할당도 아래와 같이 작성할 수 있습니다.
    // 이 예에서 정의한 객체내의 'length'에 값을 지정하지 않은 점에 주목하세요. 대신, "length" 변수의
    // 리터럴 이름은 우리가 해당 객체에서 꺼내오고 싶은 속성이름 자체로 사용됩니다.
    elements.map(({ length }) => length); // [8, 6, 7, 9]
    
    */
   /*JSX 콜백 안에서 this의 의미에 대해 주의해야 합니다. 
   JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다. 
   this.handleClick을 바인딩하지 않고 onClick에 전달하였다면, 
   함수가 실제 호출될 때 this는 undefined가 됩니다.
   이는 React만의 특수한 동작이 아니며, JavaScript에서 함수가 작동하는 방식의 일부입니다. 
   일반적으로 onClick={this.handleClick}과 같이 뒤에 ()를 사용하지 않고 메서드를 참조할 경우, 
   해당 메서드를 바인딩 해야 합니다.*/ 
    changeTypeHandler = (event) => {
        //직접 State를 수정하지 말고 setState()를 활용 
        this.setState({type: event.target.value});
       // console.log("Setting type:"+this.state.criteria.type);
    }
    
    changeKeywordHandler = (event) => {
        this.setState({keyword: event.target.value});
    }
    //경험에 비추어 볼 때 특정 시점에 UI가 어떻게 보일지 고민하는 이런 접근법은 
    //시간의 변화에 따라 UI가 어떻게 변화할지 고민하는 것보다 더 많은 수의 버그를 없앨 수 있습니다.
    // # 2. - 리액트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져온다.
    // ★ this.state에 선언한 변수의 값을 변경하기 위해선 setState를 사용해야함.
    //React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있습니다.
    //this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 됩니다.
    //State 업데이트는 병합됩니다
    //setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합합니다.
    componentDidMount() {
        //console.log(typeof(this.state.currentPage));
        BoardService.getBoards(this.state.currentPage,this.state.keyword,this.state.type).then((res) => {           
            //Pageable object List from controller
            //console.log(res.data);
            //Current pageNumber from Pageable object
            //console.log(typeof(res.data.pageable.pageNumber));
            this.setState({ totalPage:res.data.totalPages});
            this.setState({ currentPage:res.data.pageable.pageNumber});
            //console.log("when mounted :"+this.state.currentPage);
            this.setState({ boards: res.data.content});
        });
    }

    createBoard() {
        this.props.history.push('/create-board/');
    }

    detailBoard(boardId) {
        this.props.history.push('/detail-board/' + boardId);
    }

    //React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용합니다.
    //JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.
    pageMoving(event){
        //React에서는 false를 반환해도 기본 동작을 방지할 수 없습니다. 
        //반드시 preventDefault를 명시적으로 호출해야 합니다
        event.preventDefault();
      //console.log(event);
      //console.log("target: "+event.target.getAttribute("data-value"));
      //console.log("value: "+ typeof(event.target.getAttribute("data-value")));
        
        this.setState({currentPage:Number(event.target.getAttribute("data-value"))});
        //console.log("when clicked: "+this.state.currentPage);
        BoardService.getBoards(this.state.currentPage,this.state.keyword,this.state.type).then((res)=>{
            this.setState({boards:res.data.content});
        });
    }
    /*컴포넌트가 렌더링하는 것을 막기
    가끔 다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있습니다. 
    이때는 렌더링 결과를 출력하는 대신 null을 반환하면 해결할 수 있습니다.
    prop이 false라면 컴포넌트는 렌더링하지 않게 됩니다.*/ 
    settingPagination(){
        let pageNumber=this.state.totalPage;
        let pageNumarr=[];
        for(let i=0; i<pageNumber; i++){
            /*Key는 형제 사이에서만 고유한 값이어야 한다.
            Key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없습니다. 
            두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있습니다.*/
             
            pageNumarr.push(<Pagination.Item key={i} id={i} data-value={i} onClick={(event)=>{this.pageMoving(event)}}>{i}</Pagination.Item>)
        }
        //console.log(pageNumarr);
        return pageNumarr;
    }

    submitting = (event) => {
        //console.log("getting contents..... :"+ this.state.currentPage + "/" + this.state.keyword + "/" + this.state.type);
        BoardService.getBoards(this.state.currentPage,this.state.keyword,this.state.type).then((res)=>{
            this.setState({boards:res.data.content});
            //console.log(res.data.content);
        });
    }
    // creating tree view with json structure data 
    // if U wanna use this in other application just change the pushing element part correctly
    // parameter : data => json tree structure data 
    // recursive function patr where children nodes have more children nodes
    /*
    <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                    {       
                        this.createTree(this.state.tree_menu)
                    }
    </Menu>

    createTree(data) {
        //let level = lev || 0;
        let children = [];
        for (let i = 0; i < data.length; i++) {           
            if (data[i].children.length !== 0){ // Sub array found, build structure
                children.push(
                    <SubMenu key = {data[i].id} label = {data[i].menu_name}>
                        {this.createTree(data[i].children)} 
                    </SubMenu>
                );
            } else { // No submenu, bottom of tree
                children.push(
                    <MenuItem key = {data[i].id}>
                        {data[i].menu_name}               
                    </MenuItem> 
                );
            }
        }
        return children;
    }
    */
    // # 3. - render() 함수의 내용이 실제 웹페이지에 표시된다. 
    //      - maps() 함수를 사용해서 'boards'의 데이터를 출력한다.
    render() {
        return (
            
            <div>
                
                <h2  className="text-center">Boards List</h2>
                <div  style={{display:"flex",justifyContent:"space-between"}}>
                <button className="btn btn-primary" onClick={this.createBoard}> Write</button>
                {/*
                HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가지기 때문에, React의 다른 DOM 엘리먼트와 다르게 동작합니다.
                예를 들어, 순수한 HTML에서 이 폼은 name을 입력받습니다.
                */}
                <Form className="d-flex">
                <Form.Select aria-label="Default select example" onChange={this.changeTypeHandler}>
                    <option value="000">Total</option>
                    <option value="001">Writer</option>
                    <option value="002">Title</option>
                    <option value="003">Content</option>
                </Form.Select>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    width="250px"
                    name="keyword"
                    value={this.state.keyword} 
                    onChange={this.changeKeywordHandler}
                  />
                  <Button variant="outline-primary" onClick={this.submitting}>Search</Button>
                </Form>
                </div>
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Board ID</th>
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Written Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.id}>
                                        <td> {board.id}</td>
                                        <td> <a onClick = {() => this.detailBoard(board.id)}>{board.title}</a></td>
                                        <td> {board.writer} </td>
                                        <td> {board.createdDate} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Pagination style={{justifyContent:"center"}}>
                        <Pagination.First />
                        <Pagination.Prev />
                            {this.settingPagination()}
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;