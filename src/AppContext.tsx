import React, { useReducer, useEffect } from "react";
import PancakeProfileSdk, {
  Team,
  Profile,
  Achievement,
} from "@pancakeswap/profile-sdk";
import produce from "immer";
import TOP_HOLDERS from "./topHolders";

const pancakeSdk = new PancakeProfileSdk();

export interface ProfileData {
  address: string;
  profile?: Profile;
  achievements?: Achievement[];
  hasRegistered?: boolean;
  isSample?: boolean;
  loading: boolean;
}

interface ProfilesByAddress {
  [key: string]: ProfileData;
}

interface AppState {
  teams: Team[];
  teamsLoading: boolean;
  profiles: ProfilesByAddress;
}

const initialState: AppState = {
  teams: [],
  teamsLoading: true, // Show spinner until teams are loaded
  profiles: {},
};

// Main app state's reducer. Uses immer for simpler update logic
const reducer = (state: AppState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "setProfile":
      return produce(state, (draft) => {
        draft.profiles[action.payload.address] = {
          address: action.payload.address,
          profile: action.payload.profile,
          achievements: action.payload.achievements,
          hasRegistered: action.payload.hasRegistered,
          loading: action.payload.loading,
          isSample: action.payload.isSample,
        };
      });
    case "setTeams":
      return produce(state, (draft) => {
        draft.teams = action.payload.teams;
        draft.teamsLoading = action.payload.loading;
      });
    default:
      return state;
  }
};

interface ContextState {
  profiles: ProfileData[];
  teams: Team[];
  teamsLoading: boolean;
  fetchProfile: (address: string) => void;
  isLoadingData: (address: string) => boolean;
  getProfilesInTeam: (teamId: number) => ProfileData[];
  getUnregisteredUsers: () => ProfileData[];
  loadSampleAddresses: () => Promise<boolean>;
}

const initialContextState: ContextState = {
  profiles: [],
  teams: [],
  teamsLoading: false,
  fetchProfile: async (address: string) => {},
  isLoadingData: (address: string) => false,
  getProfilesInTeam: (teamId: number) => [],
  getUnregisteredUsers: () => [],
  loadSampleAddresses: () => Promise.resolve(false),
};

const AppContext = React.createContext(initialContextState);

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTeams = async () => {
      dispatch({ type: "setTeams", payload: { teams: [], loading: true } });
      const teams = await Promise.all([
        pancakeSdk.getTeam(1),
        pancakeSdk.getTeam(2),
        pancakeSdk.getTeam(3),
      ]);
      dispatch({ type: "setTeams", payload: { teams, loading: false } });
    };
    fetchTeams();
  }, []);

  const loadSampleAddresses = async () => {
    try {
      await Promise.all(
        TOP_HOLDERS.map((holder) => fetchProfile(holder, true))
      );
      return true;
    } catch {
      return false;
    }
  };

  const fetchProfile = async (address: string, isSample?: boolean) => {
    const userInState = Object.keys(state.profiles).find(
      (profileAddress) => profileAddress === address
    );
    const userHasProfile = userInState
      ? state.profiles[userInState].profile
      : false;
    const unregisteredUser = userInState
      ? state.profiles[userInState].hasRegistered !== undefined
      : false;
    const profileIsLoading = userInState
      ? state.profiles[userInState].loading
      : false;

    if (!userHasProfile && !profileIsLoading && !unregisteredUser) {
      dispatch({
        type: "setProfile",
        payload: { address, loading: true, isSample },
      });
      const { profile, hasRegistered } = await pancakeSdk.getProfile(address);
      const achievements = await pancakeSdk.getAchievements(address);
      dispatch({
        type: "setProfile",
        payload: {
          address,
          profile,
          hasRegistered,
          loading: false,
          achievements,
          isSample,
        },
      });
    }
  };

  const getProfilesInTeam = (teamId: number) => {
    return Object.values(state.profiles)
      .filter(({ profile }) => profile?.teamId === teamId)
      .sort((a, b) => {
        if (a.profile && b.profile) {
          return b.profile.points - a.profile.points;
        }
        return 0;
      });
  };

  const isLoadingData = (address: string) => {
    const userInState = Object.keys(state.profiles).find(
      (profileAddress) => profileAddress === address
    );
    return userInState ? state.profiles[userInState].loading : false;
  };

  const getUnregisteredUsers = () => {
    return Object.values(state.profiles).filter(
      ({ hasRegistered }) => hasRegistered === false
    );
  };

  return (
    <AppContext.Provider
      value={{
        profiles: Object.values(state.profiles),
        teams: state.teams,
        teamsLoading: state.teamsLoading,
        fetchProfile,
        isLoadingData,
        getProfilesInTeam,
        getUnregisteredUsers,
        loadSampleAddresses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
