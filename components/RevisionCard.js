import React, { useGlobal } from 'reactn';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RevisionCard = ({
  revision: {
    amendment = null,
    newText,
    createdAt,
    backer,
    votes = [],
    title,
    id,
    repeal = false,
  },
  ...props
}) => {
  const [activeRevision, setActiveRevision] = useGlobal('activeRevision');

  const renderCategory = () => {
    if (repeal) {
      return (
        <View style={[styles.cardCategory, styles.redBorder]}>
          <Text style={[styles.cardCategoryText, styles.redText]}>REPEAL</Text>
        </View>
      );
    }
    if (amendment !== null) {
      return (
        <View style={styles.cardCategory}>
          <Text style={styles.cardCategoryText}>REVISION</Text>
        </View>
      );
    }

    return (
      <View style={[styles.cardCategory, styles.greenBorder]}>
        <Text style={[styles.cardCategoryText, styles.greenText]}>NEW</Text>
      </View>
    );
  };
  const goToRevision = () => {
    setActiveRevision(id);
    props.navigation.navigate('ViewRevision');
  };
  const support = votes.filter(({ support }) => support.length);
  const img = backer
    ? { uri: backer.icon }
    : require('../assets/user-default.png');
  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={goToRevision}>
      <Text style={styles.cardHeader}>{title}</Text>
      <View style={styles.cardBody}>
        <View style={styles.cardStats}>
          {renderCategory()}
          <View style={styles.cardVotesWrapper}>
            <Text style={styles.cardVotesSupport}>+{support}</Text>
            <Text style={styles.slash}>/</Text>
            <Text style={styles.cardVotesReject}>
              -{votes.length - support}
            </Text>
          </View>
        </View>
        <Text
          style={styles.revisionText}
          ellipsizeMode={'tail'}
          numberOfLines={3}
        >
          {newText}
        </Text>
        <View style={styles.backerWrapper}>
          <View style={styles.backerImgWrapper}>
            <Image style={styles.backerImg} source={img} />
          </View>
          <Text style={styles.proposedDate}>
            {new Date(createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RevisionCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: 300,
    marginBottom: 15,
  },
  cardHeader: {
    backgroundColor: '#3a3e52',
    // width: "100%",
    padding: 10,
    color: '#FFFFFF',
  },
  cardBody: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#282a38',
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  cardCategory: {
    borderRadius: 9999,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00DFFC',
  },
  cardCategoryText: {
    textTransform: 'uppercase',
    color: '#00DFFC',
  },
  cardVotesWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardVotesSupport: {
    fontSize: 12,
    color: '#9eebcf',
  },
  slash: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  cardVotesReject: {
    fontSize: 12,
    color: '#ff725c',
  },
  revisionText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  backerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backerImgWrapper: {
    borderRadius: 9999,
    height: 40,
    width: 40,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backerImg: {
    height: 40,
    width: 40,
  },
  proposedDate: {
    fontSize: 15,
    color: '#FFFFFFb7',
  },
  greenText: {
    color: '#9eebcf',
  },
  redText: {
    color: '#ff725c',
  },
  greenBorder: {
    borderColor: '#9eebcf',
  },
  redBorder: {
    borderColor: '#ff725c',
  },
});
