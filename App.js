import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Text,
  Button,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[-1, 1, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    };
  }

  componentDidMount = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    });
    this.setState({ currentPlayer: 1 });
  };

  renderIcon = (row, col) => {
    const val = this.state.gameState[row][col];
    switch (val) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  gameLogic = () => {
    const { gameState } = this.state;
    let sum = 0;
    let zeroes = 0;
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        sum += gameState[i][j];
      }
      switch (sum) {
        case 3:
          return 1;
        case -3:
          return -1;
        default:
      }
      sum = 0;
    }
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        sum += gameState[j][i];
      }
      switch (sum) {
        case 3:
          return 1;
        case -3:
          return -1;
        default:
      }
      sum = 0;
    }
    for (let i = 0; i < 3; i += 1) {
      sum += gameState[i][i];
    }
    switch (sum) {
      case 3:
        return 1;
      case -3:
        return -1;
      default:
    }
    sum = 0;
    for (let i = 0; i < 3; i += 1) {
      sum += gameState[i][2 - i];
    }
    switch (sum) {
      case 3:
        return 1;
      case -3:
        return -1;
      default:
    }
    for (let i = 0; i < 3; i += 1)
      for (let j = 0; j < 3; j += 1) if (gameState[i][j] === 0) zeroes += 1;
    if (zeroes === 0) return -2;

    return 2;
  };

  onTilePress = (row, col) => {
    let { currentPlayer } = this.state;
    const gameState = this.state.gameState.slice();
    if (gameState[row][col] === 0) gameState[row][col] = currentPlayer;
    this.setState({ gameState });
    currentPlayer *= -1;
    this.setState({ currentPlayer });
    switch (this.gameLogic()) {
      case 1:
        Alert.alert("Player X won the game");
        this.componentDidMount();
        this.setState({ currentPlayer: -1 });
        break;
      case -1:
        Alert.alert("Player O won the game");
        this.componentDidMount();
        this.setState({ currentPlayer: 1 });
        break;
      case -2:
        Alert.alert("No player won the game");
        this.componentDidMount();
        this.setState({
          currentPlayer: Math.round(Math.random) === 0 ? -1 : 1
        });
        break;
      default:
    }
  };

  playerText = () => {
    switch (this.state.currentPlayer) {
      case 1:
        return (
          <Text style={{ fontSize: 30, color: "red" }}>
            Player <Icon name="close" style={{ fontSize: 30, color: "red" }} />
            &apos;s turn
          </Text>
        );
      case -1:
        return (
          <Text style={{ fontSize: 30, color: "green" }}>
            Player{" "}
            <Icon
              name="circle-outline"
              style={{ fontSize: 30, color: "green" }}
            />
            / &apos;s turn
          </Text>
        );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.playerText()}
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={[
                styles.box,
                {
                  borderTopWidth: 0,
                  borderLeftWidth: 0
                }
              ]}
            >
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={[styles.box, { borderTopWidth: 0 }]}
            >
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={[
                styles.box,
                {
                  borderTopWidth: 0,
                  borderRightWidth: 0
                }
              ]}
            >
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={[styles.box, { borderLeftWidth: 0 }]}
            >
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={[styles.box, {}]}
            >
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={[styles.box, { borderRightWidth: 0 }]}
            >
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={[
                styles.box,
                {
                  borderLeftWidth: 0,
                  borderBottomWidth: 0
                }
              ]}
            >
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={[styles.box, { borderBottomWidth: 0 }]}
            >
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={[
                styles.box,
                {
                  borderRightWidth: 0,
                  borderBottomWidth: 0
                }
              ]}
            >
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
        <Button title="Reset" onPress={this.componentDidMount} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  box: {
    borderWidth: 5,
    width: 100,
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tileX: {
    color: "red",
    fontSize: 60
  },
  tileO: {
    color: "green",
    fontSize: 60
  }
});
