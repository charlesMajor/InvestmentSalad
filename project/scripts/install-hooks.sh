GIT_DIR=$(git rev-parse --git-dir)

echo "Running from: $PWD"
echo "Git dir is: $GIT_DIR"

echo "Installing hook....."

echo "Linking: $GIT_DIR/hooks/pre-commit.sh"

ln -sf ../../scripts/pre-commit.sh $GIT_DIR/hooks/pre-commit

echo "DONE"
