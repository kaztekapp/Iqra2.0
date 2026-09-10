-- Let the creator of a study group delete it.
--
-- study_groups had insert and update policies for the creator but no delete
-- policy, so a delete from the app matched zero rows and nothing happened.
-- Every child table (members, messages, sessions, challenges, reactions,
-- class content) already references study_groups ON DELETE CASCADE, so this
-- one policy is the whole change: deleting the group row removes everything
-- in it, and only the creator can do it.

DROP POLICY IF EXISTS "Creators can delete groups" ON study_groups;
CREATE POLICY "Creators can delete groups"
  ON study_groups FOR DELETE
  USING (auth.uid() = creator_id);
