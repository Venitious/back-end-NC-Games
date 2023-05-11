\c nc_games_test

-- SELECT reviews.review_id, COUNT(comments.review_id) AS comment_count
-- FROM reviews
-- LEFT JOIN comments
-- ON reviews.review_id = comments.review_id
-- GROUP BY reviews.review_id;

--  ON treasures.shop_id = shops.shop_id`

-- SELECT reviews.review_id, reviews.owner, reviews.created_at, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews
-- LEFT JOIN comments
-- ON reviews.review_id = comments.review_id
-- GROUP BY reviews.review_id;

-- SELECT * FROM comments; 

-- SELECT reviews.review_id, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews
-- LEFT JOIN comments
-- ON reviews.review_id = comments.review_id
-- GROUP BY reviews.review_id
-- ORDER BY reviews.created_at DESC;

SELECT * FROM comments
WHERE review_id = '1'; 