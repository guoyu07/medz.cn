<?php
defined('WEKIT_VERSION') or exit(403);
/**
 * 后台菜单添加
 *
 * @author Medz Seven <lovevipdsw@vip.qq.com>
 * @copyright 
 * @license 
 */
class App_Search_ConfigDo {
	
	/**
	 * 获取站内搜索后台菜单
	 *
	 * @param array $config
	 * @return array 
	 */
	public function getAdminMenu($config) {
		$config['medz'] = array(
			'0' => 'Medz Server',
			'1' => array(),
		);
		$config['Medz_Search'] = array('站内搜索', 'app/manage/*?app=search', '', '', 'medz');
		return $config;
	}
}

?>