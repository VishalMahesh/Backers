import { Comments } from "../../components/feed/comments";
import Modal from 'react-native-modal'
import React, { useState } from 'react'
import { FeedOption } from "../../components/feed/options";
import { Appreciation, ModalBox } from "../../components/feed/appreciation";
import StoryView from "../stories";
import { OptionList } from "../../constants/dummy";
import { Platform } from "react-native";
import Images from "../../constants/Images";
import { SubscriptionModal } from "../../components/subscription";
import { Colors } from "../../constants";
const Presenters = ({
    comment,
    closeComment,
    option,
    closeOption,
    pay,
    closePay,
    verifyEmail,
    closeVerify,
    story,
    closeStory,
    height,
    optiondata = OptionList,
    action,
    subscription,
    closeSubscription,
    ...props
}) => {

    const [scrollOffset, onChange] = useState(null)
    const handleOnScroll = event => {
        onChange(event.nativeEvent.contentOffset.y)
    };
    const scrollref = React.createRef();
    const handleScrollTo = p => {
        if (scrollref.current) {
            scrollref.current.scrollTo(p);
        }
    };


    return <>
        <Modal
            style={{ padding: 0, margin: 0 }}
            swipeDirection={'down'}
            onSwipeComplete={closeComment}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            isVisible={comment}
            scrollTo={handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={400 - 300} // content height - ScrollView height
            propagateSwipe={true}
            onBackButtonPress={closeComment}
        >
            <Comments
                onCancel={closeComment}
                height={height}
                ref={scrollref}
                handleOnScroll={handleOnScroll}
                {...props}
            />
        </Modal>
        <Modal
            style={{ padding: 0, margin: 0 }}
            swipeDirection={'down'}
            onSwipeComplete={closeOption}
            onBackButtonPress={closeOption}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            isVisible={option}>
            <FeedOption
                onCancel={closeOption}
                data={optiondata}
                action={(ind) => action(ind)}
            />
        </Modal>
        <Modal
            style={{ padding: 0, margin: 0 }}
            onBackButtonPress={closePay}
            // swipeDirection={'down'}
            // onSwipeComplete={() => this.setState({ pay: false })}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            isVisible={pay}>
            <Appreciation
                onClose={closePay}
                ById={props.ById}
                onSend={props.submitPay}
            />
        </Modal>
        <Modal
            style={{ padding: 0, margin: 0 }}
            swipeDirection={'down'}
            onSwipeComplete={closeVerify}
            onBackButtonPress={closeVerify}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            isVisible={verifyEmail}>
            <ModalBox
                onSubmit={closeVerify}
                closeModal={closeVerify}
                mainLabel={"Verify your account"}
                icon={Images.mailbox}
                description={"Kindly verify your account to use this feature."}
                btnlabel={"Send verification email"}
            />
        </Modal>
        <Modal
            style={{ padding: 0, margin: 0 }}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            onBackButtonPress={closeStory}
            isVisible={story}>
            <StoryView
                onClose={closeStory}
            />
        </Modal>
        <Modal
            style={{ padding: 0, margin: 0 }}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            onBackButtonPress={closeSubscription}
            isVisible={subscription}>
            <SubscriptionModal
                onClose={closeSubscription}
                ById={props.ById}
                onComplete={props.onComplete}
            />
        </Modal>
        <Modal
            style={{ padding: 0, margin: 0 }}
            swipeDirection={'down'}
            onSwipeComplete={props.closeSubs}
            onBackButtonPress={props.closeSubs}
            useNativeDriver={Platform.OS == 'ios' ? false : true}
            isVisible={props.subs}>
            <ModalBox
                onSubmit={props.subsComplete}
                closeModal={props.closeSubs}
                mainLabel={"Successfully Subscribed"}
                icon={Images.smilesuccess}
                description={"You have successfully subscribed to view this post."}
                btnlabel={"Okay"}
                btncolor={Colors.green}
            />
        </Modal>
    </>
}

export default Presenters