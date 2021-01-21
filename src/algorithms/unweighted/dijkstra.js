import react from "react";

function dijkstra(nodes) {
  let start = findStartNode(nodes),
    finish = findFinishNode(nodes),
    curr_node = start,
    dir_y = [-1, 0, 1, 0],
    dir_x = [0, 1, 0, -1],
    queue = [],
    result = [];
  let index = 0;
  while (queue != null) {
    console.log(index);
    if (compareArrays(finish, curr_node) == true) {
      return result;
    }
    if (curr_node === undefined) {
      return result;
    }
    result.push(curr_node);

    for (let i = 0; i < 4; i++) {
      if (
        !isArrayInArray(result, [
          curr_node[0] + dir_y[i],
          curr_node[1] + dir_x[i],
        ]) &&
        !isArrayInArray(queue, [
          curr_node[0] + dir_y[i],
          curr_node[1] + dir_x[i],
        ]) &&
        betweenBounds([curr_node[0] + dir_y[i], curr_node[1] + dir_x[i]]) &&
        nodes[curr_node[0] + dir_y[i]][curr_node[1] + dir_x[i]][4] === false
      ) {
        queue.push([curr_node[0] + dir_y[i], curr_node[1] + dir_x[i]]);
      }
    }
    curr_node = queue.shift();
    index = index + 1;
  }
}
export default dijkstra;

function findStartNode(nodes) {
  for (let i in nodes) {
    for (let j in nodes[i])
      if (nodes[i][j][2] === true) return [parseInt(i), parseInt(j)];
  }
}

function findFinishNode(nodes) {
  for (let i in nodes) {
    for (let j in nodes[i])
      if (nodes[i][j][3] === true) return [parseInt(i), parseInt(j)];
  }
}

function isArrayInArray(big_arr, small_arr) {
  for (let i in big_arr)
    if (big_arr[i][0] === small_arr[0] && big_arr[i][1] === small_arr[1]) {
      return true;
    }
  return false;
}

function compareArrays(arr1, arr2) {
  if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
  return false;
}

function betweenBounds(arr) {
  if (arr[0] >= 0 && arr[0] <= 24 && arr[1] >= 0 && arr[1] <= 57) return true;
  return false;
}
