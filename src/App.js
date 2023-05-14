// 1. - 의존하는 패키지등을 정의한 곳이다. react-router-dom과 최상위 컴포넌트등을 정의.

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import DetailBoardComponent from './components/DetailBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent'; //# 1 single line needed when adding a component
import 'bootstrap/dist/css/bootstrap.css' // bootstrap css importing line
import SideMenuComponent from './components/SideMenuComponent';
import { height } from '@mui/system';

// 2. - App()함수에 최상위 컴포넌트들을 정의함.

function App() {
  return (
    <div style={{height:"100%"}}> 
      <Router> {/* 3. - react-router의 적용대상의  컴포넌트를 <Router>로 감싼다.*/}
      {/*주의: 컴포넌트의 이름은 항상 대문자로 시작합니다.
      React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리합니다.  
  예를 들어 <div />는 HTML div 태그를 나타내지만, <HeaderComponent />은 컴포넌트를 나타내며 범위 안에 Welcome이 있어야 합니다.*/}            
      <HeaderComponent/> {/* 4. - 웹 페이지의 헤더부분을 표시하는 컴포넌트를 정의. */}
        <div style={{display:"flex",height:"100%"}}>
        <SideMenuComponent/>
          <div className="container">
            <Switch> {/* -  5. URL별로 페이지를 전환하기 위한 최상위 컴포넌트들을 <Switch>로 감싼다.
                            <Route>에 컴포넌트에 대응하는 URL과 컴포넌트를 정의.
                            ★ 헤더와 푸터의 경우 <Switch>로 감싸지지 않았으므로 페이지가 전환되도 계속출력됨.*/}
              <Route path = "/" exact component = {ListBoardComponent}></Route>
              <Route path = "/sign-in" exact component = {SignInComponent}></Route>
              <Route path = "/sign-up" exact component = {SignUpComponent}></Route>
              <Route path = "/board" component = {ListBoardComponent}></Route>
              <Route path = "/create-board" component = {CreateBoardComponent}></Route>
              <Route path = "/detail-board/:boardId" component = {DetailBoardComponent}></Route>
            </Switch>
          </div>
          </div>
        <FooterComponent/> {/* 6. 웹 페이지의 푸터부분을 표시하는 컴포넌트를 정의.*/}
      </Router>
    </div>
  );
}

export default App;

/*컴포넌트 합성
컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있습니다. 
이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미합니다. 
React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현됩니다.
*/