--安装或更新时需要注册的sql写在这里--

--
-- 表的结构 `pw_medz_website_user`
--

CREATE TABLE IF NOT EXISTS `pw_medz_website_user` (
  `uid` int(10) unsigned NOT NULL COMMENT '用户id（uid）',
  `url` varchar(200) CHARACTER SET latin1 NOT NULL COMMENT '注册域名',
  `md5` varchar(32) CHARACTER SET latin1 NOT NULL COMMENT '用户网站校验值',
  `password` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '开启域名登陆后校验的用户密码',
  `login` int(1) DEFAULT NULL COMMENT '是否开启域名登陆',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB DEFAULT COMMENT='用户网站认证注册记录表';