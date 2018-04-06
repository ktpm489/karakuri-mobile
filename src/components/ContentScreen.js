import React, { PureComponent } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getSelectedAugmentedContent } from '../selectors/contents'
import HeaderTitle from './HeaderTitle'
import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lyrics: {
    flex: 1,
  },
  lyricsContentContainer: {
    alignItems: 'center',
    padding: 5,
  },
  lyricsLine: {
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 5,
  },
})

export class ContentScreen extends PureComponent {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { lyrics: [] }
  }

  componentWillMount() {
    if (!this.props.content.id) return
    fetch(this.props.url.concat(`/contents/${this.props.content.id}`))
      .then(response => response.json())
      .then(({ lyrics }) => this.setState({ lyrics }))
      .catch(err => console.error(err))
  }

  report = () => {}
  addToPlaylist = () => this.props.addToPlaylist(this.props.content.id)
  toggleFavorite = () => this.props.toggleFavorite(this.props.content.id)

  render() {
    const { content } = this.props
    const { lyrics } = this.state

    if (!content.songName) {
      return (
        <View>
          <Text>No content found :(</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <HeaderTitle title={content.songName} />
        <View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.addToPlaylist} title="Add to Playlist" />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.toggleFavorite}
              title={content.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              color={content.isFavorite ? Colors.accent : Colors.favorite}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.report} title="Report" color={Colors.error} />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.lyricsContentContainer} style={styles.lyrics}>
          {lyrics &&
            lyrics.map((lyricsLine, key) => (
              <Text
                style={styles.lyricsLine}
                key={key} // eslint-disable-line react/no-array-index-key
              >
                {lyricsLine}
              </Text>
            ))}
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    content: getSelectedAugmentedContent(state),
    url: state.connection.url,
  }),
  { addToPlaylist, toggleFavorite },
)(ContentScreen)