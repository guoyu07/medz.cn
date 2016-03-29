<?php
defined('WEKIT_VERSION') or exit(403);
/**
 * 配置项
 *
 * @author Medz Seven <lovevipdsw@vip.qq.com>
 * @copyright http://www.medz.cn
 * @license http://www.medz.cn
 */
class App_MedzRegisterWebsite_ConfigDo {
	
	/**
	 * 获取网站认证注册后台菜单
	 *
	 * @param array $config
	 * @return array 
	 */
	public function getAdminMenu($config) {
		$config['medz'] = array(
			'0' => 'MedzServer',
			'1' => array(),
		);
		$config += array(
			'ext_MedzRegisterWebsite' => array('网站认证注册', 'app/manage/*?app=MedzRegisterWebsite', '', '', 'medz'),
			);
		return $config;
	}
	
	/**
	 * 获取注册页面底部处理js
	 */
	public function getFooter() {
		PwHook::template('footer', 'EXT:MedzRegisterWebsite.template.hook.footerJs', true, '');
	}
}
