\c nc_games_test

SELECT * FROM comments
    WHERE review_id = '2'
    ORDER BY created_at DESC;