<?php
defined('WEKIT_VERSION') or exit(403);
/* 
	魅柒服务储存帮助类
	name：魅柒（sivay.Du）
	E-mail:love@medz.cn
	website:http://www.medz.cn 
*/

class App_Medz_Server {

	public function medz($name, $field=false, $write=false, $data=array()) {
		$appname = 'search'; //设置应用标识
		$Suffix = 'return.php'; // 设置储存文本后缀
		$file = Wind::getRealPath('EXT:' . $appname . '.conf.' . $name, $Suffix, true);
		$conf = @include $file;
		$conf || $conf = array();
		if($write) {
			WindFile::savePhpData($file, $data);
			return $this->medz($name, $field);
		} else {
			if($field === false) {
				return $conf;
			} else {
				return $conf[$field];
			}
		}
	}
}
