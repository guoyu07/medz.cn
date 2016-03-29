<?php
defined('WEKIT_VERSION') || exit('Forbidden');
Wind::import('SRC:library.engine.hook.PwBaseHookInjector');
Wind::import('EXT:MedzRegisterWebsite.service.do.App_Medz_RegisterWebsite_Do');
/**
 * 用户注册，注入接口~~
 *
 * @author 魅柒 <lovevipdsw@vip.qq.com>
 * @copyright http://www.medz.cn
 * @license http://www.medz.cn
 */
 
class App_Medz_RegisterWebsite_Injector extends PwBaseHookInjector {
	
	public function run() {
		$url = $this->getInput('websiteurl', 'post');
		return new App_Medz_RegisterWebsite_Do($this->bp, $url);
	}
	
}