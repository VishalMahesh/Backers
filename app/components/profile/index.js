import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";

class ProfileButton extends React.Component {

    _seeUserProfile = () => {
        const { user } = this.props;
        this.props.navigation.push("Profile", {
            user: user,
        });
    };

    render() {
        return this.props.comment ? (
            <Text onPress={this._seeUserProfile}>{this.props.children}    </Text>
        ) : (
            <TouchableOpacity {...this.props} onPress={this._seeUserProfile}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

export default withNavigation(ProfileButton);
