// - axios를 사용해서 spring boot api와 데이터통신을 담당할 모듈인 'Service'를 구현하는 파트.
import axios from 'axios'; //# 1.
import setPopup from 'react';
import navigate from 'react'; 
import Swal from "sweetalert2";

//# 2. 
const BOARD_API_BASE_URL = "http://localhost:9999/api/board"; 
const USER_API_BASE_URL = "http://localhost:9999/user/"; 
axios.defaults.headers = {
    'Content-Type': 'application/json',
}

const MENU_API_BASE_URL ="http://localhost:9999/menu/"
class BoardService {
//# 3.
    //can use queryString in axios function
    getBoards(currentPage,keyword,type) {
        return axios.get(BOARD_API_BASE_URL + "/" + currentPage + "?keyword=" + keyword + "&type=" + type);
    }

    getMenus(){
        return axios.get(MENU_API_BASE_URL+"menus");
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    detailBoard(boardID) {
        return axios.get(BOARD_API_BASE_URL+"/detail/"+boardID);
    }

    modifyBoard(board){
        return axios.post(BOARD_API_BASE_URL+"/modify",board);
    }
    deleteBoard(boardID,board){
        console.log(board);
        return axios.post(BOARD_API_BASE_URL+"/delete/"+boardID,board).then(function(response){
            if(response.data === 0){
                Swal.fire("Deleted!!!");
            }else{
                Swal.fire("Failed!!");
            }
        })
    }

    signUp(signUpForm){
        return axios.post(USER_API_BASE_URL+"signUp",signUpForm).then(function (response) {
            if(response.data.code === 0){
                setPopup({
                    open: true,
                    title: "Confirm",
                    message: "Join Success!", 
                    callback: function(){
                        navigate("/sign-up");
                    }
                });
            } else {
                let message = response.data.message;
                if(response.data.code === 10000){
                    message = "User ID is duplicated. Please enter a different User ID. "
                }
                setPopup({
                    open: true,
                    title: "Error",
                    message: message
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    logIn(logInForm){       
        return axios.post(USER_API_BASE_URL + "logIn",logInForm).then(function(response){
            if(response.data === 0){            
                //alert("Wrong Password!!!! Try again!!!!");
                //navigate("/sign-up");
                Swal.fire("Wrong Password or Email!!");
                //render(PopupComponent);
                //history.push('/sign-up');
                navigate("/sign-up");
            }else if(response.data === 1){
                //alert("Welcome!!!");
                Swal.fire("Welcome!!");
                //history.push('/sign-up');
                navigate("/board");
            }
        }).catch(function (error){
            console.log(error);
        });
    }
}

export default new BoardService();



/*
{ response 구성
  // `data`는 서버가 제공하는 응답입니다.
  data: {},

  // `status`는 HTTP 상태 코드입니다.
  status: 200,

  // `statusText`는 HTTP 상태 메시지입니다.
  statusText: 'OK',

  // `headers`는 HTTP 헤더입니다.
  // 모든 헤더 이름은 소문자이며, 괄호 표기법을 사용하여 접근할 수 있습니다.
  // 예시: `response.headers['content-type']`
  headers: {},

  // `config`는 요청을 위해 `Axios`가 제공하는 구성입니다.
  config: {},

  // `request`는 이번 응답으로 생성된 요청입니다.
  // 이것은 node.js에서 마지막 ClientRequest 인스턴스 입니다.
  // 브라우저에서는 XMLHttpRequest입니다.
  request: {}
}
*/ 