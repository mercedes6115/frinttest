import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import MenuService from '../service/MenuService';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


class SideMenuComponent extends Component {
    //props는 읽기 전용입니다.
    //함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다
    //props는 읽기 전용입니다.
    //함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다
    //순수 함수 : 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문입니다.
    //클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 합니다.
    constructor(props){
        super(props)
        //State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어됩니다.
        this.state={
            tree_menus : []
        }
    }

    //componentDidMount() 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행됩니다.
    componentDidMount(){
        BoardService.getMenus().then((res) => {
            let arr=[];
            arr = MenuService.MenuIntoTree(res.data);
            //컴포넌트 로컬 state를 업데이트하기 위해 this.setState()를 사용
            //State를 올바르게 사용하기
            //1.직접 State를 수정하지 마세요 대신에 setState()를 사용합니다.
            //this.state를 지정할 수 있는 유일한 공간은 바로 constructor입니다.
            //2.State 업데이트는 비동기적일 수도 있습니다.
            //React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있습니다.
            //this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 
            //다음 state를 계산할 때 해당 값에 의존해서는 안 됩니다.
            //3.State 업데이트는 병합됩니다
            //setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합합니다.
            //컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있습니다.
            this.setState({tree_menus:arr});               
        })
    }
    
    createTree(tree_menus){
        //let level = lev || 0;
        let children = [];
        for (let i = 0; i < tree_menus.length; i++) {           
            if (tree_menus[i].children.length !== 0){ // Sub array found, build structure
                children.push(
                    <TreeItem key = {tree_menus[i].id} nodeId={tree_menus[i].id} label = {tree_menus[i].menu_name}>
                        {this.createTree(tree_menus[i].children)} {/* recursive function part where children nodes have more children nodes*/}
                    </TreeItem>
                );
            } else { // No submenu, bottom of tree
                children.push(
                    <TreeItem key = {tree_menus[i].id} nodeId={tree_menus[i].id} label={tree_menus[i].menu_name}/>                        
                );
            }
        }
        return children;
    }
    render() {
        return (
            <div>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >{
                   this.createTree(this.state.tree_menus)
                }
                </TreeView>
            </div>
        );
    }
}

export default SideMenuComponent;