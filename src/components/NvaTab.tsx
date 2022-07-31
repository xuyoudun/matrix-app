import React, {useContext, useState} from 'react';
import {Dropdown, Menu, Tabs} from 'antd';
import {NvaTabContext, NAV_TAB_DASHBOARD} from './NvaTabProvider';
import './NvaTab.less'
import {RenderTabBar} from 'rc-tabs/lib/interface';

const TabPane = Tabs.TabPane;

const NvaTab: React.FC<Record<string, never>> = () => {

  const {activeKey, removeAll, refresh, remove, removeOthers, changeNvaTab, nvaTabs} = useContext(NvaTabContext)
  const [contextKey, setContextKey] = useState<string>('');

  const contextMenu = (
    <Menu>
      <Menu.Item
        key="refresh"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          refresh?.()
        }}
      >
        刷新
      </Menu.Item>
      {
        contextKey == NAV_TAB_DASHBOARD.url ? null : (
          <Menu.Item
            key="remove"
            onClick={(e) => {
              e.domEvent.stopPropagation()
              remove?.(contextKey)
            }}
          >
            关闭
          </Menu.Item>)
      }
      <Menu.Item
        key="removeOthers"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          removeOthers?.(contextKey)
        }}
      >
        关闭其他
      </Menu.Item>
      <Menu.Item
        key="removeAll"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          removeAll?.();
        }}
      >
        全部关闭
      </Menu.Item>
    </Menu>
  );

  const renderTabBar: RenderTabBar = (tabNavBarProps, TabNavList) => {
    // https://github.com/react-component/tabs/blob/master/src/TabNavList/TabNode.tsx
    // renderWrapper包裹TabNode
    return (
      <TabNavList {...tabNavBarProps}>
        {
          (node) => {
            return (
              <Dropdown
                overlay={contextMenu}
                placement="bottomLeft"
                trigger={['contextMenu']}
              >
                <div onContextMenu={(e) => {
                  e.preventDefault();
                  setContextKey(`${node.key}`)
                }}>
                  {node}
                </div>
              </Dropdown>
            );
          }
        }
      </TabNavList>
    )
  }
  return (
    <Tabs
      activeKey={activeKey}
      animated={false}
      className="nva-tab"
      hideAdd
      onChange={changeNvaTab}
      onEdit={(targetKey, action) => {
        if (action === 'remove' && typeof targetKey == 'string') {
          remove?.(targetKey)
        }
      }}
      renderTabBar={renderTabBar}
      type="editable-card"
    >
      {
        nvaTabs?.map((tab) => (
          <TabPane
            closable={tab.url != NAV_TAB_DASHBOARD.url}
            key={tab.url}
            tab={tab.title}
          />
        ))
      }
    </Tabs>
  );
}

export default NvaTab;

