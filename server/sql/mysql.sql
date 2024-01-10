create database if not exists outdoor_experience_sharing;

use outdoor_experience_sharing;

INSERT INTO `goods` (`id`, `goods_name`, `cover_img`, `description`, `price`, `createdAt`, `updatedAt`)
VALUES
	(5, '佳明245', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '这是一款运动手表hhhhhhhhhhhhhhhhhhhhasdklfjadsklfjk番窠倒臼阿反馈拉德季山卡拉；发啊圣诞节快乐附件阿萨德开了房久啊圣诞快乐附件考拉束带结发扣篮大赛就开了；发阿圣诞节；开了房久啊圣诞快乐；发久啊代课老师', 2499, '2024-01-09 08:19:14', '2024-01-09 08:19:14'),
	(7, '佳明245', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '这是一款运动手表hhhhhhhhhhhhhhhhhhhhasdklfjadsklfjk番窠倒臼阿反馈拉德季山卡拉；发啊圣诞节快乐附件阿萨德开了房久啊圣诞快乐附件考拉束带结发扣篮大赛就开了；发阿圣诞节；开了房久啊圣诞快乐；发久啊代课老师', 2499, '2024-01-09 08:19:16', '2024-01-09 08:19:16'),
	(8, '高驰pace3', 'http://127.0.0.1:8000/1704789036061-957324925.jpg', '<p>&lt;div&gt;&lt;h2&gt;高驰手表3&lt;/h2&gt;&lt;p&gt;质感非凡的&lt;strong&gt;高驰手表3&lt;/strong&gt;，是每个追求卓越、热爱生活、追求品质的人的理想之选。手表采用了瑞士制造的顶级自动机械机芯，与时代精神完美融合。&lt;/p&gt;&lt;img src=\"your_image_url\" alt=\"高驰手表3\"&gt;&lt;h3&gt;卓越的工艺品质&lt;/h3&gt;&lt;p&gt;每个&lt;strong&gt;高驰手表3&lt;/strong&gt;都由经验丰富的匠人手工精心打磨，采用优质不锈钢材质和防刮磨损的蓝宝石玻璃镜面，确保了手表无论在何种环境下，都能保持坚固耐用的品质。&lt;/p&gt;&lt;h3&gt;精准计时&lt;/h3&gt;&lt;p&gt;&lt;strong&gt;高驰手表3&lt;/strong&gt;集精准计时、日期显示以及夜光功能于一身，凸显其对细节的严谨追求。其精巧的设计风格使得该手表不仅仅是时间的记录者，更是一种时尚的体现。&lt;/p&gt;&lt;h3&gt;舒适优雅&lt;/h3&gt;&lt;p&gt;&lt;strong&gt;高驰手表3&lt;/strong&gt;的表带设计轻巧柔软，紧贴皮肤，使用者在佩戴的过程中能够享受到舒适的体验，同时深蓝的表盘设计和金色的刻度，赋予了这款手表无比优雅的魅力。&lt;/p&gt;&lt;p&gt;一款真心为生活品质而设计的腕表，&lt;strong&gt;高驰手表3&lt;/strong&gt;希望与你一起，享受每一刻精彩的生活。&lt;/p&gt;&lt;/div&gt;&lt;br&gt;</p>', 1499, '2024-01-09 08:31:59', '2024-01-09 08:36:58');

INSERT INTO `user` (`id`, `nickname`, `openid`, `phone`, `avatar`, `password`, `role`, `createdAt`, `updatedAt`)
VALUES
	(1, '大碴粥茶蛋', NULL, '15933371902', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '$2a$10$ybTq0vBKQ6nxsKlk8dR2AufKHl4SK2zOFDmayfxh1N18ZcjVgVhIq', 1, '2024-01-08 11:08:57', '2024-01-09 07:16:30'),
	(2, '可可', NULL, '15175472508', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '$2a$10$0O3rggtny59pncLOZMwXYOxECFxYr8NKcbMaJv99T7to/7SDc6eGi', 0, '2024-01-08 11:09:08', '2024-01-09 07:16:47'),
	(3, '大家好', NULL, '1593371902', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '$2a$10$rwOC0KhAEgFpZAIbs/SmzuHSXsRatf44kNu4YwN1D5g5B1zzVN2Va', 0, '2024-01-09 06:01:53', '2024-01-09 06:01:53'),
	(4, '盖了帽', NULL, '15175472508', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '$2a$10$ipOO9U5nZku1szv3V5JyV.phgBRk0yqbNdIaOzDpqKjLOcGalV4uq', 0, '2024-01-09 06:03:04', '2024-01-09 06:03:04');

INSERT INTO `topic` (`id`, `user_id`, `title`, `content`, `cover_img`, `createdAt`, `updatedAt`)
VALUES
	(1, 1, '沧州一日游', 'djaklfjalsdkfjldkasjfkldasjkflajkl', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '2024-01-09 08:45:38', '2024-01-09 08:45:38'),
	(2, 1, '沧州一日游', 'djaklfjalsdkfjldkasjfkldasjkflajkl', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '2024-01-09 08:45:39', '2024-01-09 08:45:39'),
	(3, 1, '沧州一日游', 'djaklfjalsdkfjldkasjfkldasjkflajkl', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '2024-01-09 08:45:40', '2024-01-09 08:45:40'),
	(4, 1, '沧州一日游', 'djaklfjalsdkfjldkasjfkldasjkflajkl', 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg', '2024-01-09 08:45:41', '2024-01-09 08:45:41');
